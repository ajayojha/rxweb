---
title: leapYear
description: LeapYear validation validator will check whether the value entered is a leap year or not.
author: rxcontributorone

---
# When to use
Suppose you want to create a user value form , which contains fields like name, birth year, joining year and you want the user to enter value which is in leap year format Here depending upon the requirement these scenarios may arise..
1. Allow only leap year in the field of birthyear.
2. Apply leapyear validation based on matched condition in the form, like if the name  is ‘John’ then the birthYear value should be leapyear.
3. Adding Custom Message on joining Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how LeapYear validator fulfil the need.

# Basic LeapYear Validation
We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\leapYear\add\leap-year-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\leapYear\add\leap-year-add.component.html?type=section)]

[!example(?title=leapYear validator for add Example)]
<app-leapYear-add-validator></app-leapYear-add-validator>

# BaseConfig
Below options are not mandatory to use in the `RxwebValidators.leapYear()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | leapyear validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

LeapYear validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\leapYear\conditionalExpression\leap-year-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\leapYear\conditionalExpression\leap-year-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=leapYear validator with conditionalExpression)]
<app-leapYear-conditionalExpression-validator></app-leapYear-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\leapYear\message\leap-year-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\leapYear\message\leap-year-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=leapYear validator with custom message)]
<app-leapYear-message-validator></app-leapYear-message-validator>

# Complete LeapYear Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-leapYear-complete-validator></app-leapYear-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\leapYear\complete\leap-year-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\leapYear\complete\leap-year-complete.component.html)]
***

# Dynamic LeapYear Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-leapYear-dynamic-validator></app-leapYear-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\leapYear\dynamic\leap-year-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\leapYear\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\leapYear\dynamic\leap-year-dynamic.component.html)]
***