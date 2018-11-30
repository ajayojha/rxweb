---
title: minLength 
description: MinLength validation validator will allow user to enter the input length matching the minimum length value parameter.
author: rxcontributorone

---
# When to use
Suppose you want to create a Contact form, which contains fields like countryName, MobileNo,LandlineNo and you want the user to enter valid  Number which should be of the minimum specified length. Here depending upon the requirement these scenarios may arise.
1. Apply MinLength validation based on matched condition in the form, like if the CountryName is ‘India’ then the countryCode value  should be of the minimum specified length. .
2. Adding Custom Message on LandlineNo Field.
3. Adding value which you want to restrict number in the property. The Minimum length is '10'. 
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how minLength validator fulfil the need.

# Basic MinLength Validation
We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\minLength\add\min-length-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minLength\add\min-length-add.component.html?type=section)]

[!example(?title=minLength validator for add Example)]
<app-minLength-add-validator></app-minLength-add-validator>

# NumberConfig 

message and conditional expression options are not mandatory to use in the `RxwebValidators.minLength()` validator but value is mandatory. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | Min Length validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict string length in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 
Min Length validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minLength\conditionalExpression\min-length-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minLength\conditionalExpression\min-length-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=minLength validator with conditionalExpression)]
<app-minLength-conditionalExpression-validator></app-minLength-conditionalExpression-validator>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minLength\message\min-length-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minLength\message\min-length-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=minLength validator with custom message)]
<app-minLength-message-validator></app-minLength-message-validator>

## value 
Type :  `number` 
enter value which you want to restrict string length in the property.

[!codeExample(?title=valueExample)]

[!TabGroup(?showHideCondition="value")]
# [Component](#tab\valueComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minLength\value\min-length-value.component.ts)]
# [Html](#tab\valueHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minLength\value\min-length-value.component.html)]
***

[!example(?type=section&clickEventCode="value=!value"&title=minLength validator with value)]
<app-minLength-value-validator></app-minLength-value-validator>

# Complete MinLength Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-minLength-complete-validator></app-minLength-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minLength\complete\max-number-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minLength\complete\min-length-complete.component.html)]
***

# Dynamic MinLength Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-minLength-dynamic-validator></app-minLength-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minLength\dynamic\max-number-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minLength\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minLength\dynamic\min-length-dynamic.component.html)]
***