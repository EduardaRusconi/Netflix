import { baseModel } from "./baseModel";
import { group_groupsDWModel } from "./group_groupsDwModel";
import { userModel } from "./userModel";

export class groupModel extends baseModel {
  /* #region Propriedades Publicas*/
  public UserModel: userModel[];
  public Name: string;
  public ReadOnly: boolean;
  public GroupGroupsDws: group_groupsDWModel[];
  /* #endregion */

  /* #region Construtor*/
  constructor() {
    super();
    this.UserModel = [];
    this.Name = '';
    this.ReadOnly = true;
    this.GroupGroupsDws = [];
  }
  /* #ednregion */
}
