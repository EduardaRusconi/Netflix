export class searchTabModel {

    /*# region Propriedades Publicas  */
    public ConfigurationId: number;
    public GroupDWGuid: string;
    public SearchDWGuid: string;
    public SearchDWName: string;
    public SearchDWFileCabinet: string;
    /* #endregion */

    /* #region Construtor */
    constructor() {
        this.ConfigurationId = 0;
        this.GroupDWGuid = '';
        this.SearchDWGuid = '';
        this.SearchDWName = '';
        this.SearchDWFileCabinet = '';
    }
    /* #endregion */
}
