---
title: alpha
description: Alpha validation decorator will allow only alphabets to be entered. It will not allow any digit or special character.
author: rxcontributorone
---

# When to use
Suppose you want to create a Country form, which contains fields like CountryName, CountryCode, StateName, StateCode and you want the user to enter only alphabets. Here depending upon the requirement these scenarios may arise.
<ol>
	<li>Allow only alphabets in CountryName without space.</li>
	<li>Allowing WhiteSpace in StateName.</li>
	<li>Apply alpha validation based on matched condition in the form, like if the CountryName is 'India' then the StateCode value should be in alphabets.</li>
	<li>Adding Custom Message on StateCode Field.</li>
	<li>Apply alpha validation dynamically based on server rules. </li>
</ol>
Let's see how alpha decorator fulfil the need.
 
# Basic Alpha Validation
<data-scope scope="['decorator']">
First we need to create a Country class and define a property of CountryName in the model to achieve the functional need of point 1.
<div component="app-code" key="alpha-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="alpha-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="alpha-add-html"></div> 
<div component="app-example-runner" ref-component="app-alpha-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="alpha-edit-component"></div> 
The below code is `country-data.json` for getting data from the server
<div component="app-code" key="alpha-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="alpha-edit-html"></div> 
<div component="app-example-runner" ref-component="app-alpha-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','templateDriven']">
<div component="app-code" key="alpha-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="alpha-add-html"></div> 
<div component="app-example-runner" ref-component="app-alpha-add"></div>
</data-scope>

# AlphaConfig
Below options are not mandatory to use in the `@alpha()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a title="allowWhiteSpace">[allowWhiteSpace](#allowWhiteSpace)</a></td><td>This will allow whitespace in particular control property. The default value is `false`.</td></tr>
<tr><td><a title="conditionalExpression">[conditionalExpression](#conditionalExpression)</a></td><td>Alpha validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a title="message">[message](#message)</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## allowWhiteSpace 
Type :  `boolean` 

This will allow whitespace in particular control property.The default value is `false`.

<div component="app-code" key="alpha-allowWhiteSpaceExample-model"></div> 
<div component="app-example-runner" ref-component="app-alpha-allowWhiteSpace" title="alpha decorators with allowWhiteSpace" key="allowWhiteSpace"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

Alpha validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="alpha-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="alpha-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-alpha-conditionalExpression" title="alpha decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

<div component="app-code" key="alpha-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-alpha-message" title="alpha decorators with message" key="message"></div>

# Complete Alpha Example

This Complete Alpha example which includes all the AlphaConfig properties will fulfil the requirement of scenarios 1, 2, 3 and 4.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-alpha-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="alpha-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="alpha-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="alpha-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic Alpha Example

This Dynamic Alpha example which execute based on json passed. conditional expression with function would be not apply in dynamic alpha example. 

<div component="app-tabs" key="dynamic"></div>
[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-alpha-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="alpha-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="alpha-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="alpha-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="alpha-dynamic-html"></div> 
# [/Html]
***
</data-scope>
