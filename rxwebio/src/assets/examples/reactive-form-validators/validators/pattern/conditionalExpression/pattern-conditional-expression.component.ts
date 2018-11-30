import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-pattern-conditionalExpression-validator',
    templateUrl: './pattern-conditional-expression.component.html'
})
export class PatternConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            userName:['', RxwebValidators.pattern({pattern:{'onlyAlpha': RegExp('/^[A-Za-z]+$/')} })], 
            age:['', RxwebValidators.pattern({pattern:{'onlyDigit': RegExp('/^[0-9]*$/')}  ,conditionalExpression:'x => x.userName=="Bharat"' })], 
            contactNumber:['', RxwebValidators.pattern({pattern:{'onlyDigit': RegExp('/^[0-9]*$/')}  ,conditionalExpression:(x,y) => x.userName == "Bharat"  })], 
        });
    }
}
