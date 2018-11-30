import {  contains, } from "@rxweb/reactive-form-validators"
export class User {

	@contains({value:'@gmail.com' }) 
	emailAddress: string;

	@contains({value:'@gmail.com'  ,conditionalExpressions:x => x.emailAddress == "abc@gmail.com" }) 
	recoveryEmailAddress: string;

	@contains({value:'@gmail.com'  ,message:'Please enter valid gmailId' }) 
	otherEmailAddress: string;

}
