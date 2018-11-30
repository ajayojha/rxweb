import {  startsWith,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@startsWith({value:'B'  ,message:'{{0}} does not starts with `B`' }) 
	name: string;

	//If you want to apply conditional expression of type 'function'
	@startsWith({value:'Senior'  ,conditionalExpression:(x,y) => x.name == "Bharat"  }) 
	profession: string;

	//If you want to apply conditional expression of type 'string'
	@startsWith({value:'#'  ,conditionalExpression:'x => x.name =="Bharat"' }) 
	taskId: string;

}
