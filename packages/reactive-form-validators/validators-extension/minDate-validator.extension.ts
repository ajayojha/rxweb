import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { DateConfig } from "../models/config/date-config";
import { minDateValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function minDateValidatorExtension(config?: DateConfig): ValidatorFn {
    var validator = minDateValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.minDate, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.minDate),validator(control);
      return null
    }
    return rxwebValidator;
}
