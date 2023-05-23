import { baseModel } from "./baseModel";
import { clientModel } from "./clientModel";
import { users_groupsModel } from "./user_groupsModel";
import { tokenJWT } from "./tokenJWT";

export class userModel extends baseModel {

  /* #region Propriedades Publicas */
  public UserName: string;
  public Password: string;
  public Email: string;
  public AzureToken: string;
  public ClientId: number;
  public ClientModel?: clientModel;
  public GroupsUsers?: users_groupsModel[];
  public Admin: boolean;
  public token?: tokenJWT;
  /* #endregion */

  /* #region Construtor*/
  constructor() {
    super();

    this.UserName = '';
    this.Password = '';
    this.Email = '';
    this.AzureToken = '';
    this.ClientId = 0;
    this.ClientModel = undefined;
    this.GroupsUsers = undefined;
    this.Admin = false;
    this.token = undefined;
  }
  /* #endregion */
}
