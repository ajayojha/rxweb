import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { CustomConfig } from "../models/config/custom-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';

export function customValidator(config:CustomConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        if (FormProvider.ProcessRule(control,config)) {
            const formGroupValue = ApplicationUtil.getParentObjectValue(control);
            const parentObject = (control.parent) ? control.parent.value : undefined;
                let result = null;
                for(let rule of config.customRules) {
                     result = rule(formGroupValue,parentObject,config.additionalValue);
                     if(result)
                      break;
                }
              if(result)
                 return result;
            }return ObjectMaker.null();
    }
}
