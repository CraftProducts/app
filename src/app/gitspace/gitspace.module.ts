import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { gitspaceReducer } from './+state/gitspace.reducer';
import { gitspaceInitialState } from './+state/gitspace.init';
import { GitspaceEffects } from './+state/gitspace.effects';
import { GitspaceComponent } from './components/gitspace.component';
import { GitspaceFilesComponent } from './components/files-sidebar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {NgxFilesizeModule} from 'ngx-filesize'

@NgModule({
  declarations: [GitspaceComponent, GitspaceFilesComponent],
  exports: [GitspaceComponent, GitspaceFilesComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    NgxFilesizeModule,
    
    StoreModule.forFeature("gitspace", gitspaceReducer, { initialState: gitspaceInitialState }),
    EffectsModule.forFeature([GitspaceEffects])
  ]
})
export class GitspaceModule { }
