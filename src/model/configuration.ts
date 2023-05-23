import { baseModel } from "./baseModel";

export class configuration extends baseModel {
  /*#region Propriedades Publicas */
  public Name: string;
  public Url: string;
  public UserName: string;
  public Password: string;
  public UserNameRO: string;
  public PasswordRO: string;
  public ConnectionStringDW: string;
  public PassPhrase: string;
  /* #endregion */

  /*#region  Construtor*/
  constructor() {
    super();
    this.Name = '';
    this.Url = '';
    this.UserName = '';
    this.Password = '';
    this.UserNameRO = '';
    this.PasswordRO = '';
    this.ConnectionStringDW = '';
    this.PassPhrase = '';
  }
  /* #ednregion */
}
