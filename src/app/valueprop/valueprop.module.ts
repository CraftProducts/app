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
import { FormsModule } from '@angular/forms';
import { ValuePropHomeComponent } from './components/home.component';
import { AppCommonModule } from '../appcommon/appcommon.module';
import { PendingChangesGuard, SharedLibModule } from 'shared-lib';
import { NgTruncatePipeModule } from 'angular-pipes';

const routes: Route[] = [
  { path: ':template', component: ValuePropHomeComponent, canDeactivate: [PendingChangesGuard] }
];

@NgModule({
  declarations: [ValuePropHomeComponent],
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
