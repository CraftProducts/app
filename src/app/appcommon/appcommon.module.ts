import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedLibModule } from 'shared-lib';
import { NgxMdModule } from 'ngx-md';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgTruncatePipeModule } from 'angular-pipes';
import { GDriveSelectorComponent } from './googledrive/gdrive.component';
import { AngularSplitModule } from 'angular-split';


const componentList = [
  GDriveSelectorComponent
];

@NgModule({
  declarations: componentList,
  exports: componentList,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    NgTruncatePipeModule,
    AngularSplitModule,
    SharedLibModule,

    FontAwesomeModule,
    NgxMdModule
  ],
  providers: []
})
export class AppCommonModule { }
