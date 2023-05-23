export class loadingModel {
  public Show: boolean;
  public Text: string;
  public Type: loadingType;

  constructor(Show?: boolean, Text?: string, Type?: loadingType) {
    this.Show = Show || false;
    this.Text = Text || '';
    this.Type = Type || loadingType.Success;
  }
}

enum loadingType {
  Erro, Info, Warning, Success
}
