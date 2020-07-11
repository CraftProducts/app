import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './components/notes.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as _ from 'lodash';
import { SharedLibModule } from 'shared-lib';
import { NgxMdModule } from 'ngx-md';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgTruncatePipeModule } from 'angular-pipes';
import { RecordEditorComponent } from './components/record-editor.component';
import { ListEditorComponent } from './components/list-editor.component';
import { TextEditorComponent } from './components/text-editor.component';
import { LinksComponent } from './components/links.component';

const componentList = [NotesComponent, LinksComponent,
  TextEditorComponent, ListEditorComponent, RecordEditorComponent];

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
