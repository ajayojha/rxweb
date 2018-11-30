---
title: numeric
description: numeric validation validator will check whether the value entered is a valid numberic value or not.The validation can be set according to requirement, it can be either decimal,negative number or positive number.
author: rxcontributorone

---
# When to use
Suppose you want to create a user form, which contains fields like DataType, integerNumber,integerNumber and you want the user to enter only numeric value depending on validation of the property. Here depending upon the requirement these scenarios may arise.
1.  Allow only positive numbers in integerNumber.
2.  Allow only Negative numbers in integerNumber.
3.  Allow decimal value in integerNumber  
4.	Apply numeric validation based on matched condition in the form, like if the dataType  is ‘Integer’ then the number value should be Integer number.
5.	Adding Custom Message on Negative value Field.
6.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how Numeric validator fulfil the need.

# Basic numeric Validation
We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\reactive-form-validators\reactive-form-validators\validators\numeric\add\numeric-add.component.ts?type=section)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\reactive-form-validators\validators\numeric\add\numeric-add.component.html?type=section)]

[!example(?title=numeric validator for add Example)]
<app-numeric-add-validator></app-numeric-add-validator>

# NumericConfig
Below options are not mandatory to use in the `RxwebValidators.numeric()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[acceptValue](#acceptValue) | To apply validation based on checking positive or negative value or both. |
|[allowDecimal](#allowDecimal) | This will allow decimal in particular control property.The default value is `false`. |
|[conditionalExpression](#conditionalExpression) | Numeric validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## acceptValue 
Type :  `NumericValueType` 

To apply validation based on checking positive or negative value or both.

[!codeExample(?title=acceptValueExample)]

[!TabGroup(?showHideCondition="acceptValue")]
# [Component](#tab\acceptValueComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\numeric\acceptValue\numeric-accept-value.component.ts)]
# [Html](#tab\acceptValueHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\numeric\acceptValue\numeric-accept-value.component.html)]
***

[!example(?type=section&clickEventCode="acceptValue=!acceptValue"&title=numeric validator depending upon acceptValue)]
<app-numeric-acceptValue-validator></app-numeric-acceptValue-validator>

## allowDecimal 
Type :  `boolean` 

This will allow decimal in particular control property.The default value is `false`.

[!codeExample(?title=allowDecimalExample)]

[!TabGroup(?showHideCondition="allowDecimal")]
# [Component](#tab\allowDecimalComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\numeric\allowDecimal\numeric-allow-decimal.component.ts)]
# [Html](#tab\allowDecimalHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\numeric\allowDecimal\numeric-allow-decimal.component.html)]
***

[!example(?type=section&clickEventCode="allowDecimal=!allowDecimal"&title=alpha validator with allowDecimal)]
<app-numeric-allowDecimal-validator></app-numeric-allowDecimal-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 

Numeric validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\numeric\conditionalExpression\numeric-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\numeric\conditionalExpression\numeric-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=numeric validator with conditionalExpression)]
<app-numeric-conditionalExpression-validator></app-numeric-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\numeric\message\numeric-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\numeric\message\numeric-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=numeric validator with custom message)]
<app-numeric-message-validator></app-numeric-message-validator>

# Complete numeric Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-numeric-complete-validator></app-numeric-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\numeric\complete\numeric-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\numeric\complete\numeric-complete.component.html)]
***

# Dynamic numeric Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-numeric-dynamic-validator></app-numeric-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\numeric\dynamic\numeric-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\numeric\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\numeric\dynamic\numeric-dynamic.component.html)]
***
