import { userModel } from "./userModel";

export class tokenJWT {
    /* #region Propriedades Publicas */
    public access_token: string;
    public token_type: string;
    public expires_in: number;
    public user?: userModel;

    /* #endregion */

    /* #region Construtor */
    constructor() {
        this.access_token = '';
        this.token_type = '';
        this.expires_in = 0;

        this.user = undefined;
    }
    /* #endregion */
}