import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { tokenJWT } from "src/model/tokenJWT";
import { userModel } from "src/model/userModel";
import { BaseServices } from "./BaseServices";
import { HttpClientHelper } from "./HttpClientHelper";

@Injectable()
export class UserServices extends BaseServices<userModel> {
  /* #region Propriedades Publicas */
  /** Observação de usuario logado  */
  public currentUser: Observable<tokenJWT>;
  /* #edregion */

  /* #region Propriedades Privadas */
  /** Evento de observação de usuario */
  private currentUserSubject: BehaviorSubject<tokenJWT>;
  /* #endregion */

  /*#region Construtor */
  constructor(http: HttpClient) {
    super('User', http);

    const json: string = localStorage.getItem('currentUser') ?? '';

    if (json != '') {
      this.currentUserSubject = new BehaviorSubject<tokenJWT>(JSON.parse(json));
    } else {
      this.currentUserSubject = new BehaviorSubject<tokenJWT>(new tokenJWT());
    }

    this.currentUser = this.currentUserSubject.asObservable();
  }
  /* #endregion */

  /* #region Metodos Publicos */
  /** Valor do evento de observação do usuario */
  public get currentUserValue(): tokenJWT {
    return this.currentUserSubject.value;
  }

  /** Consulta do usuario no sisteama */
  public async getUserByUsername(username: string): Promise<userModel> {
    return await HttpClientHelper.get<userModel>(this.http, environment.urlAPI + 'User/getUserByUsername?userName=' + username, '') ?? new userModel();
  }

  /** Acesso do usuario */
  public async login(username: string, password: string, aud: string): Promise<boolean> {
    const json: string = localStorage.getItem('currentUser') ?? '';

    if (json != '') {
      this.currentUserSubject = new BehaviorSubject<tokenJWT>(JSON.parse(json));
    } else {
      this.currentUserSubject = new BehaviorSubject<tokenJWT>(new tokenJWT());
    }

    this.currentUser = this.currentUserSubject.asObservable();

    const body = new HttpParams({
      fromObject: {
        username,
        password,
        'grant_type': 'password',
        'aud': aud,
      }
    });

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const token = await HttpClientHelper.post<tokenJWT>(this.http, `${environment.urlToken}`, body.toString(),
      {
        headers: headers
      });

    if (token as any === {}) {
      return false;
    }

    localStorage.setItem('currentUser', JSON.stringify(token));
    this.currentUserSubject.next(token);

    const model: userModel = await this.getUserByUsername(username);

    token.user = model;

    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(token));
    this.currentUserSubject.next(token);

    return true;
  }

  /** Logout do usuario */
  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.unsubscribe();
  }
  /* #endregion*/
}