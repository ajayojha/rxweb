import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration  } from '@rxweb/reactive-form-validators';

import { ResultInfo } from '../result-info.model';

@Component({
    selector: 'app-result-info-add',
    templateUrl: './result-info-add.component.html'
})
export class ResultInfoAddComponent implements OnInit {

    resultInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let resultInfo = new ResultInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.validations = {
			maths : {
				minNumber :  {value:35,} 
			},
			science : {
				minNumber :  {value:35,message:'Number should not be less than 35',} 
			},
			statastics : {
				minNumber :  {value:35,conditionalExpressions:'x => x.maths == 50',} 
			},
        };
		this.resultInfoFormGroup = this.formBuilder.formGroup(resultInfo,formBuilderConfiguration);
    }
}
