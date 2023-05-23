import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { clientModel } from "src/model/clientModel";
import { BaseServices } from "./BaseServices";



@Injectable()
export class ClientServices extends BaseServices<clientModel> {

  /* #region Construtor */
  constructor(http: HttpClient) {
    super('Client', http);
  }

  /* #endregion */
}