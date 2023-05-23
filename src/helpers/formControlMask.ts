import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from "@angular/forms";

export class FormControlMask extends FormControl {
  public mask: string = '';

  constructor(mask: string, formState?: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(formState, validatorOrOpts, asyncValidator);

    this.mask = mask;
  }
}
