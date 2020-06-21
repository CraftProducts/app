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
const componentList = [NotesComponent, NavbarComponent];

@NgModule({
  declarations: componentList,
  exports: componentList,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,    
    NgbModule,

    SharedLibModule,

    FontAwesomeModule,
    NgxMdModule
  ],
  providers: []
})
export class AppCommonModule { }
