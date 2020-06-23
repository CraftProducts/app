import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { NgTruncatePipeModule } from 'angular-pipes';
import { SharedLibModule, PendingChangesGuard } from 'shared-lib';
import { AppCommonModule } from '../appcommon/appcommon.module';
import { NgxMdModule } from 'ngx-md';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SliderModule } from 'primeng/slider';
import { SidebarModule } from 'primeng/sidebar';
import { FileUploadModule } from 'primeng/fileupload';
import { AngularSplitModule } from 'angular-split';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { journeyReducer } from './+state/journey.reducer';
import { JourneyInitialState } from './+state/journey.init';
import { EffectsModule } from '@ngrx/effects';
import { JourneyEffects } from './+state/journey.effects';
import { JourneyHomeComponent } from './components/home.component';
import { JourneyViewerComponent } from './components/viewer.component';
import { TemplatesModule } from 'templates';

const routes: Route[] = [
  {
    path: '', component: JourneyHomeComponent, children: [
      { path: ':template', component: JourneyViewerComponent, canDeactivate: [PendingChangesGuard] }
    ]
  },
];

@NgModule({
  declarations: [JourneyHomeComponent, JourneyViewerComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgTruncatePipeModule,
    SharedLibModule,
    AppCommonModule,

    TemplatesModule,

    NgxMdModule,
    FontAwesomeModule,

    SliderModule,
    SidebarModule,
    FileUploadModule,

    NgbModule,

    StoreModule.forFeature("journey", journeyReducer, { initialState: JourneyInitialState }),
    EffectsModule.forFeature([JourneyEffects]),

    RouterModule.forChild(routes)
  ]
})
export class JourneysModule { }
