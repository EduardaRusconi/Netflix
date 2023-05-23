export class field {
  /* #region Propriedades Publicas*/
  public Name: string;
  public Value: string[];
  public Type: number;
  public DisplayName: string;
  /* #endregion*/

  /* #region Construtor */
  constructor() {
    this.Name = '';
    this.Value = [];
    this.Type = 0;
    this.DisplayName = '';
  }
  /* #endregion */
}
