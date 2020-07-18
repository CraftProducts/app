import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgTruncatePipeModule } from 'angular-pipes';
import { SharedLibModule } from 'shared-lib';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMdModule } from 'ngx-md';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { templatesReducer } from './+state/templates.reducer';
import { templatesInitialState } from './+state/templates.init';
import { TemplatesEffects } from './+state/templates.effects';
import { GroupsComponent } from './components/groups.component';
import { ListComponent } from './components/list.component';
import { LoadLocalFileComponent } from './components/localfilemanager/load.component';

const routes: Route[] = [
  {
    path: '', component: GroupsComponent, children: [
      { path: ':group', component: ListComponent }
    ]
  }
];

const components = [GroupsComponent, ListComponent, LoadLocalFileComponent];
@NgModule({
  declarations: components,
  // exports: components,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    NgTruncatePipeModule,

    SharedLibModule,

    FontAwesomeModule,
    NgxMdModule,

    StoreModule.forFeature("templates", templatesReducer, { initialState: templatesInitialState }),
    EffectsModule.forFeature([TemplatesEffects]),

    RouterModule.forChild(routes)
  ]
})
export class TemplatesModule { }
