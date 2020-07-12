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
import { journeymapsReducer } from './+state/journeymaps.reducer';
import { journeymapsInitialState } from './+state/journeymaps.init';
import { JourneymapsEffects } from './+state/journeymaps.effects';
import { FormsModule } from '@angular/forms';
import { JourneymapsHomeComponent } from './components/home.component';
import { AppCommonModule } from '../appcommon/appcommon.module';
import { PendingChangesGuard, SharedLibModule } from 'shared-lib';
import { NgTruncatePipeModule } from 'angular-pipes';

const routes: Route[] = [
  { path: ':template', component: JourneymapsHomeComponent, canDeactivate: [PendingChangesGuard] }
];

@NgModule({
  declarations: [JourneymapsHomeComponent],
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

    StoreModule.forFeature("journeymaps", journeymapsReducer, { initialState: journeymapsInitialState }),
    EffectsModule.forFeature([JourneymapsEffects]),

    RouterModule.forChild(routes)
  ]
})
export class JourneymapsModule { }
