---
title: hexColor  
description: HexColor validation validator will allow user to enter only the input in proper Hex Color format.
author: rxcontributortwo

---
# When to use
Suppose you want to create a User form, which contains fields like ColorPicker, HeaderHexColorCode, BodyHexColorCode, StrictHexColorCode and you want the user to enter only the hex color format. Here depending upon the requirement these scenarios may arise.

1.	Allow string which is a hex color format like in ColorPicker field.
2.	Apply hexColor validation based on matched condition in the form, like if the ColorPicker is `#AFAFAF`, then only the HeaderHexColorCode field will be validated to hexColor validator.
3.	Adding Custom Message on BodyHexColorCode field.
4. Applying strict format of hexCode in StrictHexCode field.
5.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how hexColor validator fulfil the need.

# Basic HexColor Validation
We need to create a `FormGroup` in the component. To achieve this, we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\hexColor\add\hex-color-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\hexColor\add\hex-color-add.component.html?type=section)]

[!example(?title=hexColor validator for add Example)]
<app-hexColor-add-validator></app-hexColor-add-validator>


# HexColorConfig 
Below options are not mandatory to use in the `RxwebValidators.hexColor()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | HexColor validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

HexColor validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\hexColor\conditionalExpression\hex-color-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\hexColor\conditionalExpression\hex-color-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=hexColor validator with conditionalExpression)]
<app-hexColor-conditionalExpression-validator></app-hexColor-conditionalExpression-validator>
 
## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\hexColor\message\hex-color-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\hexColor\message\hex-color-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=hexColor validator with custom message)]
<app-hexColor-message-validator></app-hexColor-message-validator>

# Complete hexColor Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-hexColor-complete-validator></app-hexColor-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\hexColor\complete\hex-color-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\hexColor\complete\hex-color-complete.component.html)]
***

# Dynamic hexColor Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-hexColor-dynamic-validator></app-hexColor-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\hexColor\dynamic\hex-color-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\hexColor\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\hexColor\dynamic\hex-color-dynamic.component.html)]
***