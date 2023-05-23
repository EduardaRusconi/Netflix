export class baseModel {
  /* #region Propriedades Publicas */
  public Id: number;
  public GetData: string;
  public ListData: string[];
  public Update: string;
  public Delete: string;
  /* #ednregion */

  /* #region Construtor */
  constructor() {
    this.Id = 0;
    this.Delete = '';
    this.GetData = '';
    this.ListData = [];
    this.Update = '';
  }
  /* #ednregion */
}
