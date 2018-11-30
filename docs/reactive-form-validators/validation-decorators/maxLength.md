---
title: maxLength 
description: MaxLength validation decorator will allow user to enter the input upto the maximum length value parameter.
author: rxcontributortwo

---
# When to use
Suppose you want to create a User form, which contains fields like FirstName, LastName, Username and you want the user to enter any string which should not exceed maximum length. Here depending upon the requirement these scenarios may arise.
<ol>
	<li>Allow string less than 16 characters in FirstName.</li>
	<li>Apply maxLength validation based on matched condition in the form, like if the FirstName is `john`, then only the maxLength validation will be  applied to LastName field.</li> 
	<li>Adding Custom Message on Username Field.</li>
 	<li>Apply maxLength validation dynamically based on server rules.</li>
</ol>
Let’s see how maxLength validator fulfil the need.

# Basic MaxLength Validation
<data-scope scope="['decorator']">
First we need to create a User class and define a property of FirstName in the model to achieve the functional need of point 1.
<div component="app-code" key="maxLength-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="maxLength-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="maxLength-add-html"></div> 
<div component="app-example-runner" ref-component="app-maxLength-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="maxLength-edit-component"></div>
The below code is `location-data.json` for getting data from the server 
<div component="app-code" key="maxLength-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="maxLength-edit-html"></div> 
<div component="app-example-runner" ref-component="app-maxLength-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="maxLength-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="maxLength-add-html"></div> 
<div component="app-example-runner" ref-component="app-maxLength-add"></div>
</data-scope>

# NumberConfig 
message and conditional expression options are not mandatory to use in the `@maxLength()` decorator but value is mandatory. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a title="conditionalExpression">[conditionalExpression](#conditionalExpression)</a></td><td>longitude validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a title="message">[message](#message)</a></td><td>To override the global configuration message and set the custom message on respective FormControl.</td></tr>
<tr><td><a title="value">[value](#value)</a></td> enter value which you want to restrict string length in the property.</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

MaxLength validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="maxLength-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="maxLength-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-maxLength-conditionalExpression" title="maxLength decorators with conditionalExpression" key="conditionalExpression"></div>
 
## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="maxLength-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-maxLength-message" title="maxLength decorators with message" key="message"></div>

## value 
Type :  `number` 

enter value which you want to restrict string length in the property
 
<div component="app-code" key="maxLength-valueExample-model"></div> 
<div component="app-example-runner" ref-component="maxLength-value-value" title="maxLength decorators with value" key="value"></div>

# Complete maxLength Example

This Complete maxLength example which includes all the NumberConfig properties will fulfil the requirement of scenarios 1, 2, 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-maxLength-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="maxLength-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="maxLength-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="maxLength-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic maxLength Example

This Dynamic maxLength example which execute based on json passed. conditional expression with function would be not apply in dynamic maxLength example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-maxLength-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="maxLength-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="maxLength-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="maxLength-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="maxLength-dynamic-html"></div> 
# [/Html]
***
</data-scope>