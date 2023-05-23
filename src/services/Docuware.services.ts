import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { group_groupsDWModel } from "src/model/group_groupsDwModel";
import { searchTabModel } from "src/model/searchTabModel";
import { resultSearchModel } from "../model/resultSearchModel";
import { resultTableModel } from "../model/resultTableModel";
import { searchModel } from "../model/searchModel";
import { HttpClientHelper } from "./HttpClientHelper";

@Injectable()
export class DocuwareServices {

  /* #region Construtor */
  constructor(private http: HttpClient) {
  }
  /* #endregion */

  /* #region Metodos Publicos */

  /** Campos de pesquisa por id do usuario*/
  public async listSearchesByUserId(userId: number): Promise<searchTabModel[]> {
    return await HttpClientHelper.get<searchTabModel[]>(this.http, environment.urlAPI + 'Docuware/ListSearchesByUserId/' + userId, '') ?? [];
  }

  /** Lista por id do usuario */
  public async listListsByUserId(userId: number): Promise<searchTabModel[]> {
    return await HttpClientHelper.get<searchTabModel[]>(this.http, environment.urlAPI + 'Docuware/ListListsByUserId/' + userId, '') ?? [];
  }

  /** Seleciona os grupos do Docuware*/
  public async listGroupsByConfigurationId(configurationId: number): Promise<group_groupsDWModel[]> {
    return await HttpClientHelper.get<group_groupsDWModel[]>(this.http, environment.urlAPI + 'Docuware/ListGroupsByConfigurationId/' + configurationId, '') ?? [];
  }


  /** Campos de pesquisa do usuario */
  public async listFields(searchModel: searchModel): Promise<resultSearchModel> {
    return await HttpClientHelper.post<resultSearchModel>(this.http, environment.urlAPI + 'Docuware/ListFields', searchModel);
  }

  /** Retorna pesquisa preencida */
  public async search(searchModel: searchModel): Promise<resultTableModel> {
    return await HttpClientHelper.post<resultTableModel>(this.http, environment.urlAPI + 'Docuware/SearchDocuments', searchModel);
  }


  /** Retorna lista para o sistema */
  public async list(searchModel: searchModel): Promise<resultTableModel> {
    return await HttpClientHelper.post<resultTableModel>(this.http, environment.urlAPI + 'Docuware/ListDocuments', searchModel);
  }

  /** Integração com o Docuware */
  public async urlDocuwareIntegration(searchModel: searchModel): Promise<string> {
    return await HttpClientHelper.post<string>(this.http, environment.urlAPI + 'Docuware/UrlDocuwareIntegration', searchModel);
  }


  /** Edição itens da tabela */
  public async editIndex(searchModel: searchModel): Promise<resultSearchModel> {
    return await HttpClientHelper.post<resultSearchModel>(this.http, environment.urlAPI + 'Docuware/EditIndex', searchModel);
  }


  /** Atualização da tabela editada */
  public async updateDocument(searchModel: searchModel): Promise<boolean> {
    return await HttpClientHelper.post<boolean>(this.http, environment.urlAPI + 'Docuware/UpdateDocument', searchModel);
  }


  /* #endregion */
}