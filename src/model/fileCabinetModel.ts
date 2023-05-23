import { clientModel } from "./clientModel";
import { baseModel } from "./baseModel";
import { configuration } from "./configuration"

export class fileCabinetModel extends baseModel {
  /* #region Propriedades Publicas */
  public Name: string;
  public Configurations: configuration[];
  public ClientModels: clientModel[];
  /* #endregion */

  /* #region Construtor*/
  constructor() {
    super();
    this.Name = '';
    this.Configurations = [];
    this.ClientModels = [];
  }
  /* #endregion */
}
