import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { clientModel } from "src/model/clientModel";
import { configuration } from "src/model/configuration";
import { BaseServices } from "./BaseServices";
import { HttpClientHelper } from "./HttpClientHelper";



@Injectable()
export class ConfigurationServices extends BaseServices<configuration> {

  /* #region Construtor */
  constructor(http: HttpClient) {
    super('Configuration', http);
  }

  /* #endregion */

  /* #region Metodos Publicos */
  public async listDatasByClientId(clientId: number): Promise<clientModel> {
    return await HttpClientHelper.get<clientModel>(this.http, environment.urlAPI + 'Client/GetData/' + clientId, '')?? new clientModel();
  }

  /* #endregion */
}