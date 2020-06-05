import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { NgxMdModule } from 'ngx-md';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from 'primeng/sidebar';
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

const routes: Route[] = [
  {
    path: '', component: ValuePropHomeComponent//, children: [
    //   { path: 'list', component: SearchListViewComponent },
    //   { path: 'storyboard', component: SearchStoryboardViewComponent },
    //   { path: 'timeline', component: SearchTimelineViewComponent }
    // ]
  },
];


@NgModule({
  declarations: [ValuePropHomeComponent, LayoutRendererComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxMdModule,
    FontAwesomeModule,

    SidebarModule,
    AngularSplitModule,

    NgbModule,
    StoreModule.forFeature("valueProp", valuePropReducer, { initialState: valuePropInitialState }),
    EffectsModule.forFeature([ValuePropEffects]),

    RouterModule.forChild(routes)
  ]
})
export class ValuepropModule { }
