import { baseModel } from "./baseModel";
import { configuration } from "./configuration";
import { groupModel } from "./groupModel";
import { userModel } from "./userModel";

export class group_groupsDWModel extends baseModel {
    /* #region Propriedades Publicas */
    public GroupId: number;
    public ConfigurationId: number;
    public GroupDWGuid: string;
    public GroupDWName: string;
    public UserModel: userModel[];
    public GroupModel: groupModel[];
    public Configuration: configuration;
    /* #endregion */

    /* #region Construtor*/
    constructor() {
        super();
        this.GroupId = 0;
        this.ConfigurationId = 0;
        this.GroupDWGuid = '';
        this.GroupDWName = '';
        this.UserModel = [];
        this.GroupModel = [];
        this.Configuration = new configuration();
    }
    /* #endregion */
}