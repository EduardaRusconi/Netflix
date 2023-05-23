import { baseModel } from "./baseModel";
import { groupModel } from "./groupModel";
import { group_groupsDWModel } from "./group_groupsDwModel";
import { userModel } from "./userModel";

export class users_groupsModel extends baseModel {

    /* #region Propriedades Publicas */
    public UserId: string;
    public GroupId: string;
    public User: userModel;
    public Group: groupModel;
    public GroupsDws?: group_groupsDWModel[];
    /*#endregion */

    /* #region Construtor */
    constructor() {
        super();
        this.UserId = '';
        this.GroupId = '';
        this.User = new userModel();
        this.Group = new groupModel();
        this.GroupsDws = [];
    }
    /* #endregion */
}
