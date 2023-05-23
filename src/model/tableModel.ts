import { field } from "./field";

export class tableModel {

  /* #region Propriedades Publicas*/
  public DWDocId: number;
  public Fields: field[];
  /* #endregoin */

  /* #regiopn Construtor */
  constructor() {
    this.DWDocId = 0;
    this.Fields = [];
  }
  /* #endregion */
}

