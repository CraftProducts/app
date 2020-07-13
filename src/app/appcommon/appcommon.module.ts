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
import { RecordEditorComponent } from './components/editors/record-editor.component';
import { ListEditorComponent } from './components/editors/list-editor.component';
import { TextEditorComponent } from './components/editors/text-editor.component';
import { LinksComponent } from './components/links.component';
import { TasksComponent } from './components/tasks.component';
import { GDriveSelectorComponent } from './googledrive/gdrive.component';
import { SplitLayoutRendererComponent } from './components/renderers/split-layout.component';
import { AngularSplitModule } from 'angular-split';
import { SectionEditorComponent } from './components/editors/section-editor.component';
import { FreeflowLayoutRendererComponent } from './components/renderers/freeflow-layout.component';
import { PanelRendererComponent } from './components/renderers/panel.component';
import { MatrixRendererComponent } from './components/renderers/matrix.component';

import { MatrixEditorComponent } from './components/editors/matrix-editor.component';

const componentList = [
  SplitLayoutRendererComponent, FreeflowLayoutRendererComponent,
  PanelRendererComponent, MatrixRendererComponent,
  
  NotesComponent, LinksComponent, TasksComponent,
  SectionEditorComponent, TextEditorComponent, ListEditorComponent, MatrixEditorComponent, RecordEditorComponent,
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
