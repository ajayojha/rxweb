import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { MacAddressInfo } from './mac-address-info.model';

@Component({
    selector: 'app-mac-conditionalExpression-template-driven',
    templateUrl: './mac-conditional-expression.component.html'
})
export class MacConditionalExpressionTemplateDrivenComponent implements OnInit {
    macaddressinfo: MacAddressInfo

    constructor(
    ) { }

    ngOnInit() {
       this.macaddressinfo= new MacAddressInfo()
    }
}
