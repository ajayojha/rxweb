import {  creditCard, } from "@rxweb/reactive-form-validators"
export class User {

	@creditCard({creditCardTypes:[ CreditCardType.Visa ] }) 
	creditCardNumber: string;

}
