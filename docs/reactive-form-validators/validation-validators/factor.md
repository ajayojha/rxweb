---
title: factor 
description: factor validation validator will allow user to enter factor of a number which is called dividend.
author: rxcontributorone

---

# When to use
Suppose you want to create a user form in which you want user to enter factor of a particular value which contains fields like firstNumber, secondNumber, ThirdNumber and fourthNumber. Here depending upon the requirement these scenarios may arise.
1.  Apply factor validation on firstNumber field by setting  dividend property as 50 so the validation will allow only factors of 50
2.  Apply factor validation based on matched condition in the form, like if the firstNumber  is ‘25’ then the Fourthyear value should be factor.
3.  The Custom Message on ThirdNumber field.
4.  Apply factor validation based of dividend, dividend is the value for which factors are calculated.
5.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how factor validator fulfil the need.

# Basic Factor Validation
We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\add\factor-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\add\factor-add.component.html?type=section)]

[!example(?title=factor validator for add Example)]
<app-factor-add-validator></app-factor-add-validator>

# FactorConfig
Below options are not mandatory to use in the `RxwebValidators.factor()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[dividend](#dividend) | Dividend is the value for which factors are calculated. |
|[fieldName](#fieldName) | Current property is matched with the particular property. so we need to pass particular property name. |
|[conditionalExpression](#conditionalExpression) | factor validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## dividend 
Type :  `string` 
 Dividend is the value for which factors are calculated.

[!codeExample(?title=dividendExample)]

[!TabGroup(?showHideCondition="dividend")]
# [Component](#tab\dividendComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\dividend\factor-dividend.component.ts)]
# [Html](#tab\dividendHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\dividend\factor-dividend.component.html)]
***

[!example(?type=section&clickEventCode="dividend=!dividend"&title=factor validator with dividend)]
<app-factor-dividend-validator></app-factor-dividend-validator>

## fieldName 
Type :  `string` 
Current property is matched with the particular property. so we need to pass particular property name.

[!codeExample(?title=fieldNameExample)]

[!TabGroup(?showHideCondition="fieldName")]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\fieldName\factor-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\fieldName\factor-field-name.component.html)]
***

[!example(?type=section&clickEventCode="fieldName=!fieldName"&title=factor validator with fieldName)]
<app-factor-fieldName-validator></app-factor-fieldName-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 

factor validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\conditionalExpression\factor-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\conditionalExpression\factor-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=factor validator with conditionalExpression)]
<app-factor-conditionalExpression-validator></app-factor-conditionalExpression-validator>

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\message\factor-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\message\factor-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=factor validator with custom message)]
<app-factor-message-validator></app-factor-message-validator>

# Complete Factor Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-factor-complete-validator></app-factor-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\complete\factor-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\complete\factor-complete.component.html)]
***

# Dynamic Factor Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-factor-dynamic-validator></app-factor-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\dynamic\factor-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\factor\dynamic\factor-dynamic.component.html)]
***