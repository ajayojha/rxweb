import {  minNumber, } from "@rxweb/reactive-form-validators"
export class ResultInfo {

	@minNumber({value:35 }) 
	maths: number;

	@minNumber({value:35  ,message:'Number should not be less than 35' }) 
	science: number;

	@minNumber({value:35  ,conditionalExpressions:x => x.maths == 50 }) 
	statastics: number;

}
