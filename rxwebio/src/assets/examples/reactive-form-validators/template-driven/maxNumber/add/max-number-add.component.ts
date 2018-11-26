import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { SubjectDetails } from './subject-details.model';

@Component({
    selector: 'app-maxNumber-add-template-driven',
    templateUrl: './max-number-add.component.html'
})
export class MaxNumberAddTemplateDrivenComponent implements OnInit {
    subjectdetails: SubjectDetails

    constructor(
    ) { }

    ngOnInit() {
       this.subjectdetails= new SubjectDetails()
    }
}
