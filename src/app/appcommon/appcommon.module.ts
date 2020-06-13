import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './components/notes.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as _ from 'lodash';
import { SharedLibModule } from 'shared-lib';

const componentList = [NotesComponent];

@NgModule({
  declarations: componentList,
  exports: componentList,
  imports: [
    CommonModule,
    FormsModule,

    SharedLibModule,
    FontAwesomeModule
  ]
})
export class AppCommonModule { }
