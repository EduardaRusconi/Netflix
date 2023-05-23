import { AfterViewInit, Directive, ElementRef, HostListener, Injector, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, NgControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormGroupCustom } from 'src/helpers/formGroupCustom';

@Directive({
  selector: '[validate]'
})
export class ValidateMessageDirective implements OnInit {
  private ngxMask: string = '';
  private inputElem!: HTMLInputElement;
  private _lastMaskedValue = '';
  private officialValidators: any[] = [];
  private realValidators: any[] = [];

  constructor(
    private elem: ElementRef,
    private control: NgControl,
  ) {
  }

  @HostListener('input')
  onInput() {
    if (this.ngxMask != '')
      this.inputElem.value = this._maskValue(this.inputElem.value);
  }

  ngOnInit() {
    this.inputElem = this.elem.nativeElement;

    var control = this.control.control;

    var controlName = '';
    var parent = control != null ? control["_parent"] : null;

    if (parent instanceof FormGroup) {
      Object.keys(parent.controls).forEach((name) => {
        if (control === parent.controls[name]) {
          controlName = name;
        }
      });
    }

    for (let item of (<any>control)?._rawValidators) {
      this.officialValidators.push(item);
    }

    if (!(parent as FormGroupCustom<any>).ignoreValidation) {
      var option = (parent as FormGroupCustom<any>).validateOptions?.get(controlName) ?? new Map<string, ValidateMessage>();
      this.ngxMask = parent.controls[controlName].mask ?? '';

      this.elem.nativeElement.onclick = () => {
        for (let validate of option.values()) {
          const validateMessageElem = document.getElementById(validate.id);
          if (validateMessageElem) {
            this.elem.nativeElement.parentElement.parentElement.parentElement.removeChild(validateMessageElem);
          }
        }

        for (let validate of option.values()) {
          if (control?.hasError(validate.type.toLowerCase())) {
            const divElem = document.createElement('div');
            divElem.setAttribute('class', 'alert');
            divElem.innerHTML = validate.message;
            divElem.id = validate.id;

            this.elem.nativeElement.parentElement.parentElement.parentElement.appendChild(divElem);
            break;
          }
        }
      };

      control?.valueChanges.subscribe(() => {
        this.realValidators = [];
        for (let item of this.officialValidators) {
          this.realValidators.push(item);
        }
        var i = 0;
        for (let validate of option.values()) {
          if (validate.validateOn != ValidateOn.CreateAndEdit &&
            (parent as FormGroupCustom<any>).usingOn != ValidateOn.CreateAndEdit &&
            validate.validateOn != (parent as FormGroupCustom<any>).usingOn) {
            if (this.realValidators != undefined) {
              delete this.realValidators[i];
            }
          }
          i++;
        }
        if (!(parent as FormGroupCustom<any>).formUpdated.get(controlName)) {
          (parent as FormGroupCustom<any>).formUpdated.set(controlName, true);
          control?.clearValidators();
          control?.setValidators(this.realValidators);
          control?.updateValueAndValidity();
        }

        for (let validate of option.values()) {
          const validateMessageElem = document.getElementById(validate.id);
          if (validateMessageElem) {
            this.elem.nativeElement.parentElement.parentElement.parentElement.removeChild(validateMessageElem);
          }
        }

        for (let validate of option.values()) {
          if (control?.hasError(validate.type.toLowerCase())) {
            const divElem = document.createElement('div');
            divElem.setAttribute('class', 'alert');
            divElem.innerHTML = validate.message;
            divElem.id = validate.id;
            this.elem.nativeElement.parentElement.parentElement.parentElement.appendChild(divElem);
            break;
          }
        }
      });
    }
  }

  private _maskValue(val: string): string {
    if (!val || !this.ngxMask || val === this._lastMaskedValue) {
      return val;
    }

    const maskedVal = this._lastMaskedValue =
      valueToFormat(
        val,
        this.ngxMask,
        this._lastMaskedValue.length > val.length,
        this._lastMaskedValue);

    return maskedVal;
  }

  public static genericValidation(validateOn: ValidateOn, message: string, type: string, validator: (ValidatorFn | null | undefined)): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var controlName = '';
      var parent = control["_parent"];

      if (parent instanceof FormGroup) {
        Object.keys(parent.controls).forEach((name) => {
          if (control === parent.controls[name]) {
            controlName = name;
          }
        });
      }

      let result = validator != null ? validator(control) : null;

      (control.parent as FormGroupCustom<any>)?.validateOptions?.get(controlName)?.set(type, {
        type: type,
        id: controlName,
        message: message,
        validateOn: validateOn,
        mask: '',
        formUpdated: false,
      });

      return result
    }
  }
}

export interface ValidateMessage {
  type: string;
  id: string;
  message: string;
  validateOn: ValidateOn;
  mask: string;
  formUpdated: boolean;
}

export enum ValidateOn {
  Edit, Create, CreateAndEdit
}

const _formatToRegExp: any = {
  '0': /[0-9]/, 'a': /[a-z]/, 'A': /[A-Z]/, 'B': /[a-zA-Z]/,
};

const _allFormatsStr = '(' +
  Object.keys(_formatToRegExp)
    .map(key => _formatToRegExp[key].toString())
    .map(regexStr => regexStr.substr(1, regexStr.length - 2))
    .join('|')
  + ')';

const _allFormatsGlobal = getAllFormatRegexp('g');

/**
* Apply format to a value string
*
* Format can be constructed from next symbols:
*  - '0': /[0-9]/,
*  - 'a': /[a-z]/,
*  - 'A': /[A-Z]/,
*  - 'B': /[a-zA-Z]/
*
* Example: 'AAA-00BB-aaaa'
* will accept 'COD-12Rt-efww'
*
* @param value Current value
* @param format Format
* @param goingBack Indicates if change was done by BackSpace
* @param prevValue Pass to precisely detect formatter chars
*/
function valueToFormat(value: string, format: string, goingBack = false, prevValue?: string): string {

  let maskedValue = '';
  const unmaskedValue = unmaskValue(value);

  const isLastCharFormatter = !getAllFormatRegexp().test(value[value.length - 1]);
  const isPrevLastCharFormatter = prevValue && !getAllFormatRegexp().test(prevValue[prevValue.length - 1]);

  let formatOffset = 0;
  for (let i = 0, maxI = Math.min(unmaskedValue.length, format.length); i < maxI; ++i) {
    const valueChar = unmaskedValue[i];
    let formatChar = format[formatOffset + i];
    let formatRegex = getFormatRegexp(formatChar);

    if (formatChar && !formatRegex) {
      maskedValue += formatChar;
      formatChar = format[++formatOffset + i];
      formatRegex = getFormatRegexp(formatChar);
    }

    if (valueChar && formatRegex) {
      if (formatRegex && formatRegex.test(valueChar)) {
        maskedValue += valueChar;
      } else {
        break;
      }
    }

    const nextFormatChar = format[formatOffset + i + 1];
    const nextFormatRegex = getFormatRegexp(nextFormatChar);
    const isLastIteration = i === maxI - 1;

    if (isLastIteration && nextFormatChar && !nextFormatRegex) {
      if (!isLastCharFormatter && goingBack) {
        if (prevValue && !isPrevLastCharFormatter) {
          continue;
        }
        maskedValue = maskedValue.substr(0, formatOffset + i);
      } else {
        maskedValue += nextFormatChar;
      }
    }
  }

  return maskedValue;
}

function unmaskValue(value: string): string {
  const unmaskedMathes = value.replace(' ', '').match(_allFormatsGlobal);
  return unmaskedMathes ? unmaskedMathes.join('') : '';
}

function getAllFormatRegexp(flags?: string) {
  return new RegExp(_allFormatsStr, flags);
}

function getFormatRegexp(formatChar: string): RegExp | null {
  return formatChar && _formatToRegExp[formatChar] ? _formatToRegExp[formatChar] : null;
}
