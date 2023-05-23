import { baseModel } from "./baseModel";
import { configurations_clientsModel } from "./configurations_clientsModel";
import { userModel } from "./userModel";

export class clientModel extends baseModel {
  /* #region Propriedades Publicas */
  public ClientName: string;
  public Logo: string;
  public UserQuantity: number;
  public AzureTenant: string;
  public AzureClientId: string;
  public AzureURLToLogin: string;
  public UserModel: userModel[];
  public Configurations: configurations_clientsModel[];
  /* #ednregion */

  /* #region Cosntrutor*/
  constructor() {
    super();
    this.AzureTenant = '';
    this.AzureClientId = '';
    this.AzureURLToLogin = '';
    this.ClientName = '';
    this.Logo = '';
    this.UserModel = [];
    this.UserQuantity = 0;
    this.Configurations = [];
  }
  /* #ednregion */
}
