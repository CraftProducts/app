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
import { valuePropReducer } from './+state/valueprop.reducer';
import { valuePropInitialState } from './+state/valueprop.init';
import { ValuePropEffects } from './+state/valueprop.effects';
import { ValuePropHomeComponent } from "./components/home.component";
import { FormsModule } from '@angular/forms';
import { LayoutRendererComponent } from './components/layout-renderer.component';
import { ValuePropViewerComponent } from './components/viewer.component';
import { TextEditorComponent } from './components/text-editor.component';
import { ValuePropEditorComponent } from './components/editor.component';
import { ListEditorComponent } from './components/list-editor.component';
import { ValuePropBannerComponent } from './components/banner.component';
import { AppCommonModule } from '../appcommon/appcommon.module';
import { PendingChangesGuard, SharedLibModule } from 'shared-lib';
import { ListitemEditorComponent } from './components/listitem-editor.component';
import { GDriveSelectorComponent } from './components/gdrive.component';
import { NgTruncatePipeModule } from 'angular-pipes';

const routes: Route[] = [
  {
    path: '', component: ValuePropHomeComponent, children: [
      { path: ':template', component: ValuePropViewerComponent, canDeactivate: [PendingChangesGuard] }
      //   { path: 'storyboard', component: SearchStoryboardViewComponent },
      //   { path: 'timeline', component: SearchTimelineViewComponent }
    ]
  },
];


@NgModule({
  declarations: [
    ValuePropHomeComponent, ValuePropBannerComponent, ValuePropViewerComponent, ValuePropEditorComponent,
    TextEditorComponent, ListEditorComponent, ListitemEditorComponent, LayoutRendererComponent

    , GDriveSelectorComponent
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

    StoreModule.forFeature("valueProp", valuePropReducer, { initialState: valuePropInitialState }),
    EffectsModule.forFeature([ValuePropEffects]),

    RouterModule.forChild(routes)
  ]
})
export class ValuepropModule { }
