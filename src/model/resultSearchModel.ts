import { field } from "./field";

export class resultSearchModel {
  /* #region Porpriedades Publicas*/
  public FCGuid: string;
  public SearchGuid: string;
  public Fields: field[];
  /* #endregion */

  /* #region Construtor*/
  constructor() {
    this.FCGuid = '';
    this.SearchGuid = '';
    this.Fields = [];
  }
  /* #endregion */
}
