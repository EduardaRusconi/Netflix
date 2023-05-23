import { baseModel } from "./baseModel";
import { clientModel } from "./clientModel";
import { configuration } from "./configuration";

export class configurations_clientsModel extends baseModel {
    /* #region Propriedades Publicas */
    public ConfigurationId: number;
    public ClientId: number;
    public ClientModel: clientModel;
    public Configuration: configuration;
    /* #ednregion */

    /* #region Construtor */
    constructor() {
        super();
        this.ConfigurationId = 0;
        this.ClientId = 0;
        this.ClientModel = new clientModel();;
        this.Configuration = new configuration();
    }
    /* #endregion */
}