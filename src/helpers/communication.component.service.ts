import { BehaviorSubject, Observable } from 'rxjs';
import { loadingModel } from 'src/model/loadingModel';
import { modalModel } from 'src/model/modalModel';

export class CommunicationComponentService {

  /* #region Propriedades Privadas */
  private cookie: { [key: string]: BehaviorSubject<any | undefined> } = {};
  /* #ednregion */

  /* #region Construtor */
  constructor() {
    for (let c in EnumCookie) {
      this.cookie[c] = new BehaviorSubject('');
    }
    /* #ednregion */
  }

  /* #region Metodos Publicos */
  public watch<T>(key: string, value?: T): Observable<T | undefined> {
    if (this.cookie[key] === undefined)
      this.set(key, new BehaviorSubject(value));

    /** Observação da chave de acesso */
    return this.cookie[key]?.asObservable();
  }

  /**  Pega Chave de acesso  */
  public get<T>(key: string, value?: T): T | undefined {
    if (this.cookie[key] === undefined)
      this.set(key, new BehaviorSubject(value));

    return this.cookie[key]?.getValue();
  }

  /** Retorna chave de acesso preenchida */
  public async set<T>(key: string, value: T): Promise<void> {
    if (this.cookie[key] === undefined)
      this.set(key, new BehaviorSubject(value));

    if (this.cookie[key]?.getValue() == value)
      return;

    this.cookie[key]?.next(value);
  }

  /** Exibir popup de loading */
  public loading(loading: loadingModel) {
    this.set<loadingModel>(EnumCookie.Loading, loading);
  }

  /** Esconder popup de loading */
  public hideLoading() {
    this.set<loadingModel>(EnumCookie.Loading, new loadingModel(false));
  }

  /** Exibir popup de modal */
  public modal(modal: modalModel) {
    this.set<modalModel>(EnumCookie.Modal, modal);
  }

  /* #ednregion */
}

export enum EnumCookie {
  UrlIframe = 'UrlIframe',
  Loading = 'Loading',
  Modal = 'Modal',
}
