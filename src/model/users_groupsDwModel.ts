import { baseModel } from "./baseModel";
import { groupModel } from "./groupModel";
import { userModel } from "./userModel";

export class user_groupsDWModel extends baseModel {

    /* #region Propriedades Publicas */
    public UserId: number;
    public GroupGuid: string;
    public GroupName: string;
    public UserModel: userModel[];
    public GroupModel: groupModel[];
    /* #endregion */

    /* #region Construtor */
    constructor() {
        super();
        this.UserId = 0;
        this.GroupGuid = '';
        this.GroupName = '';
        this.UserModel = [];
        this.GroupModel = [];
    }

    /* #endregion */
}