import {  startsWith,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@startsWith({value:'n' }) 
	name: string;

}
