import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn } from "@angular/forms";
import { ValidateMessage, ValidateOn } from "src/directives/validateMessage.directive";
import { FormControlArray } from "./formControlArray";

export class FormGroupCustom<T> extends FormGroup {
  /* #region Propriedades Publicas */
  /**Mensagem de validação */
  public validateOptions: Map<string, Map<string, ValidateMessage>> = new Map<string, Map<string, ValidateMessage>>();

  public ignoreValidation: boolean = false;
  public formUpdated: Map<string, boolean> = new Map<string, boolean>();
  public usingOn: ValidateOn = ValidateOn.CreateAndEdit;
  /* #endregion*/

  /* #region Construtor */
  constructor(controls: {
    [key: string]: AbstractControl;
  }, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(controls, validatorOrOpts, asyncValidator);
    this.loadValidation();
  }
  /* #endregion*/

  /* #region Metodos Publicas */
  /** Do form para a modelo*/
  public toModel(pred?: (model: T, raw: any) => T): T {
    this.ignoreValidation = false;

    let model: T = this.getRawValue();

    model = this.fillChilds(model, this.getRawValue());

    if (pred != null)
      model = pred(model, this.getRawValue());

    return model;
  }

  public refreshForm() {
    this.formUpdated = new Map<string, boolean>();
    for (let control in this.controls) {
      this.formUpdated.set(control, false);
    }
  }

  private loadValidation() {
    for (let control in this.controls) {
      this.validateOptions.set(control, new Map<string, ValidateMessage>());
      this.formUpdated.set(control, false);
    }
  }

  /** Validação dos campos */
  public validFields(): boolean {
    this.ignoreValidation = false;

    for (let control in this.controls) {
      this.get(control)?.updateValueAndValidity();
    }
    return this.valid;
  }

  /** Da modelo para o form */
  public fromModel(model: T | any) {
    this.ignoreValidation = true;
    if (model.Id != 0) {
      for (let prop in model) {
        this.get(prop)?.setValue(model[prop]);
      }
      this.populateChilds(model);
    }
    else {
      for (let control in this.controls) {
        this.get(control)?.setValue(null);
      }
    }
    this.ignoreValidation = false;
  }

  /* #region Metodos Privados */
  /** Preencher modelo para exibição no toModel */
  private fillChilds(modelParam: T | any, rawValue: any): T | any {
    for (let i in this.controls) {
      let control = this.controls[i];

      if (control instanceof FormControlArray) {
        var controlName = '';
        var parent = control["_parent"];

        if (parent instanceof FormGroup) {
          Object.keys(parent.controls).forEach((name) => {
            if (control === parent.controls[name]) {
              controlName = name;
            }
          });
        }
        modelParam[controlName] = [];

        if (Array.isArray(this.get(controlName)?.value)) {
          for (let val in this.get(controlName)?.value) {
            let aux: any = {};

            if (isNaN(this.get(controlName)?.value[val]))
              aux[control.itemListField] = this.get(controlName)?.value[val];
            else
              aux[control.itemListField] = Number.parseInt(this.get(controlName)?.value[val]);

            modelParam[controlName].push(aux);
          }
        }
        else {
          let aux: any = {};

          aux[control.itemListField] = this.get(controlName)?.value;

          modelParam[controlName] = aux;
        }
      }
    }
    return modelParam;
  }

  /** Preencher campos da modelo  */
  private populateChilds(model: T | any) {
    for (let i in this.controls) {
      let control = this.controls[i];

      if (control instanceof FormControlArray) {
        var controlName = '';
        var parent = control["_parent"];

        if (parent instanceof FormGroup) {
          Object.keys(parent.controls).forEach((name) => {
            if (control === parent.controls[name]) {
              controlName = name;
            }
          });
        }

        if (model[controlName] != undefined) {

          let listSelected = [];
          const list = model[controlName];

          for (const item of list) {
            listSelected.push(item[control.itemListField]);
          }

          this.get(controlName)?.setValue(listSelected);
        }
      }
    }
  }
  /* #endregion */
}
