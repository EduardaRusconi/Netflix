import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export class CustomValidators {
  /* #region Metodos Publicos */
  /** Mascara para caracteres especiais */
  public static replaceAll(str: string, find: string, replace: string): string {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }

  /** Mascara para identificar cpf e validar */
  public isCPF(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let cpf = CustomValidators.replaceAll(CustomValidators.replaceAll((control.value ?? ''), '.', ''), '-', '');

      if (cpf == null) {
        return { iscpf: control.value };
      }
      if (cpf.length != 11) {
        return { iscpf: control.value };
      }
      if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
        return { iscpf: control.value };
      }
      let numero: number = 0;
      let caracter: string = '';
      let numeros: string = '0123456789';
      let j: number = 10;
      let somatorio: number = 0;
      let resto: number = 0;
      let digito1: number = 0;
      let digito2: number = 0;
      let cpfAux: string = '';
      cpfAux = cpf.substring(0, 9);
      for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
          return { iscpf: control.value };;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
      }
      resto = somatorio % 11;
      digito1 = 11 - resto;
      if (digito1 > 9) {
        digito1 = 0;
      }
      j = 11;
      somatorio = 0;
      cpfAux = cpfAux + digito1;
      for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
      }
      resto = somatorio % 11;
      digito2 = 11 - resto;
      if (digito2 > 9) {
        digito2 = 0;
      }
      cpfAux = cpfAux + digito2;
      if (cpf != cpfAux) {
        return { iscpf: control.value };
      }
      else {
        return null;
      }
    }
  }

  /** Validação especifica passando função por parametro */
  private dataScpecifCall: any;
  private fnCallScpecifCall: any;
  public setSpecificParameters(data: any, fnCall: (data: any) => boolean) {
    this.dataScpecifCall = data;
    this.fnCallScpecifCall = fnCall;
  }

  public specificValidation: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    try {
      if (!this.fnCallScpecifCall(this.dataScpecifCall)) {
        return { specificcall: control.value };
      }
      else {
        return null;
      }
    } catch {
      return null;
    }
  };
  /* #endregion */
}
