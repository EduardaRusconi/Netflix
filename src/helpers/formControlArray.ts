import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from "@angular/forms";

export class FormControlArray extends FormControl {
  public itemListField: string;

  constructor(itemListField: string, formState?: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(formState, validatorOrOpts, asyncValidator);

    this.itemListField = itemListField;


  }
}
