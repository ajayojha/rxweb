import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PASSWORD_ROUTING } from "src/app/components/form-validation/validators/password/password.routing";
import { PasswordDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/password/password-decorators-extended.module";
import { PasswordValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/password/password-validators-extended.module";
import { PasswordTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/password/password-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { PASSWORD_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/password/password.constants";



@NgModule({
  imports: [PASSWORD_ROUTING, PasswordDecoratorsExtendedModule, PasswordValidatorsExtendedModule, PasswordTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: PASSWORD_COMPONENT_EXAMPLE_CONSTANT }]
})
export class PasswordModule { }

