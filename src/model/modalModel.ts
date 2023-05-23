export class modalModel {
  public Title: string;
  public Description: string;
  public functionCall: any;

  public ButtonCancelName: string;
  public ButtonFunctionName: string;

  constructor(Title?: string, Description?: string, functionCall? :any, ButtonCancelName?: string, ButtonFunctionName?: string) {
    this.Title = Title || '';
    this.Description = Description || '';
    this.functionCall = functionCall || (() => {return false;});

    this.ButtonCancelName = ButtonCancelName || 'Fechar';
    this.ButtonFunctionName = ButtonFunctionName || '';
  }
}
