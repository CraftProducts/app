import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './components/notes.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as _ from 'lodash';
import { SharedLibModule } from 'shared-lib';
import { NgxMdModule } from 'ngx-md';
import { NavbarComponent } from './components/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BannerComponent } from './components/banner.component';
import { NgTruncatePipeModule } from 'angular-pipes';

const componentList = [NotesComponent, NavbarComponent, BannerComponent];

@NgModule({
  declarations: componentList,
  exports: componentList,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    NgTruncatePipeModule,

    SharedLibModule,

    FontAwesomeModule,
    NgxMdModule
  ],
  providers: []
})
export class AppCommonModule { }
