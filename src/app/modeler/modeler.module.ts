import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { NgxMdModule } from 'ngx-md';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { FileUploadModule } from 'primeng/fileupload';
import { AngularSplitModule } from 'angular-split';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { modelerReducer } from './+state/modeler.reducer';
import { modelerInitialState } from './+state/modeler.init';
import { ModelerEffects } from './+state/modeler.effects';
import { FormsModule } from '@angular/forms';
import { ModelerHomeComponent } from './components/home.component';
import { AppCommonModule } from '../appcommon/appcommon.module';
import { PendingChangesGuard, SharedLibModule } from 'shared-lib';
import { NgTruncatePipeModule } from 'angular-pipes';
import { SplitLayoutRendererComponent } from './components/renderers/layouts/split-layout.component';
import { FreeflowLayoutRendererComponent } from './components/renderers/layouts/freeflow-layout.component';
import { MatrixRendererComponent } from './components/renderers/matrix.component';
import { PanelRendererComponent } from './components/renderers/panel.component';
import { NotesComponent } from './components/metadata/notes.component';
import { LinksComponent } from './components/metadata/links.component';
import { TasksComponent } from './components/metadata/tasks.component';
import { ListEditorComponent } from './components/editors/list-editor.component';
import { SelectEditorComponent } from './components/editors/select-editor.component';
import { SectionEditorComponent } from './components/editors/section-editor.component';
import { TextEditorComponent } from './components/editors/text-editor.component';
import { RecordEditorComponent } from './components/editors/record-editor.component';
import { MatrixEditorComponent } from './components/editors/matrix-editor.component';
import { ExportSidebarComponent } from './components/exports/export-sidebar.component';
import { MetadataRendererComponent } from './components/renderers/metadata.component';
import { ImageEditorComponent } from './components/editors/image-editor.component';
import { ThemeEditorComponent } from './components/themes/theme-editor.component';
import { ThemeListEditorComponent } from './components/themes/theme-list-editor.component';
import { MatrixCustomizerComponent } from './components/renderers/matrix-customizer.component';
import { MatrixListCustomizerComponent } from './components/renderers/matrix-list-customizer.component';
import { MatrixRecordCustomizerComponent } from './components/renderers/matrix-record-customizer.component';

const routes: Route[] = [
  { path: '', component: ModelerHomeComponent, canDeactivate: [PendingChangesGuard] }
];

@NgModule({
  declarations: [ModelerHomeComponent,
    SplitLayoutRendererComponent, FreeflowLayoutRendererComponent,
    PanelRendererComponent, MetadataRendererComponent, 
    MatrixRendererComponent, MatrixCustomizerComponent, MatrixListCustomizerComponent, MatrixRecordCustomizerComponent,

    NotesComponent, LinksComponent, TasksComponent,
    SectionEditorComponent, TextEditorComponent, ListEditorComponent, SelectEditorComponent, ImageEditorComponent,
    MatrixEditorComponent, RecordEditorComponent,

    ExportSidebarComponent, ThemeEditorComponent, ThemeListEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgTruncatePipeModule,
    SharedLibModule,
    AppCommonModule,

    NgxMdModule,
    FontAwesomeModule,

    SliderModule,
    SidebarModule,
    FileUploadModule,
    AngularSplitModule,

    NgbModule,

    StoreModule.forFeature("modeler", modelerReducer, { initialState: modelerInitialState }),
    EffectsModule.forFeature([ModelerEffects]),

    RouterModule.forChild(routes)
  ]
})
export class ModelerModule { }
