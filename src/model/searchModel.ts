import { field } from "./field";

export class searchModel {
  /* #region Propriedades Publicas*/
  public ConfigurationId: number;
  public DWDocId: number;
  public FullText: string;
  public FCGuid: string;
  public SearchGuid: string;
  public Fields: field[];
  /* #endregion */

  /* #region Construtor */
  constructor() {
    this.ConfigurationId = 0;
    this.DWDocId = 0;
    this.FullText = '';
    this.FCGuid = '';
    this.SearchGuid = '';
    this.Fields = [];
  }
  /* #endregion */
}
