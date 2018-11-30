---
title: oneOf
description: oneOf validation validator will check whether the user has entered any one of the given inputs or not.
author: rxcontributorone

---

# When to use
Suppose you want to create a employee form in which you want employee to enter any one value of a particular value which contains fields like department,hobbies and skills.Here the field is taken in the form of array and according to that the oneOf is applied on the property by applying matchvalues. Here depending upon the requirement these scenarios may arise.
1.	The skills field in which you want the user to enter skills based upon matchvalues.
2.  Apply oneOf validation based on matched condition in the form, like if the department  is ‘dotnet’ then the skills value should be based upon matchvalues.
3.  The Custom Message on Hobbies field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how oneOf validator fulfil the need.

# Basic oneOf Validation
We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\oneOf\add\one-of-add.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\oneOf\add\one-of-add.component.html)]

<app-oneOf-add-validator></app-oneOf-add-validator>

# oneOfConfig
Below options are not mandatory to use in the `RxwebValidators.odd()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[matchValue](#matchValue) | matchValue is the array based on which the validation property is set |
|[conditionalExpression](#conditionalExpression) | oneOf validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## matchValue 
Type :  `any[]` 
matchValue is the array based on which the validation property is set. According to it one of the values in the array should be matched.

[!codeExample(?title=matchValueExample)]

[!TabGroup(?showHideCondition="matchValue")]
# [Model](#tab\minLengthModel)
[!code-typescript[](\assets\examples\validators\oneOf\minLength\employee-info.model.ts)]
# [Component](#tab\minLengthComponent)
[!code-typescript[](\assets\examples\validators\oneOf\minLength\one-of-match-value.component.ts)]
# [Html](#tab\minLengthHtml)
[!code-typescript[](\assets\examples\validators\oneOf\minLength\one-of-match-value.component.html)]
***

[!example(?type=section&clickEventCode="matchValue=!matchValue"&title=oneOf validator with matchValue)]
<app-oneOf-matchValue-validator></app-oneOf-matchValue-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 

oneOf validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
 [!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

 [!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\oneOf\conditionalExpression\one-of-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\oneOf\conditionalExpression\one-of-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=oneOf validator with conditionalExpression)]
<app-oneOf-conditionalExpression-validator></app-oneOf-conditionalExpression-validator>

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\oneOf\message\one-of-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\oneOf\message\one-of-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=allOf validator with custom message)]
<app-oneOf-message-validator></app-oneOf-message-validator>

# Complete oneOf Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-oneOf-complete-validator></app-oneOf-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\oneOf\complete\one-of-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\oneOf\complete\one-of-complete.component.html)]
***

# Dynamic oneOf Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-oneOf-dynamic-validator></app-oneOf-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\oneOf\dynamic\one-of-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\oneOf\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\oneOf\dynamic\one-of-dynamic.component.html)]
***