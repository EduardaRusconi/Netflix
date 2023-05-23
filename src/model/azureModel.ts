export class azureModel {
  /* #region Propriedades Publicas */
  public ClientId: string;
  public Authority: string;
  public ApiScope: string;
  public URLToLogin: string;
  /* #ednregion */

  /* #region Construtor */
  constructor() {
    this.ClientId = '';
    this.Authority = '';
    this.ApiScope = '';
    this.URLToLogin = '';
  }
  /* #ednregion */
}
