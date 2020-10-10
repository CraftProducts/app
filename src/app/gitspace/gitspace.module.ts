import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { gitspaceReducer } from './+state/gitspace.reducer';
import { gitspaceInitialState } from './+state/gitspace.init';
import { GitspaceEffects } from './+state/gitspace.effects';
import { GitspaceMenuComponent } from './components/menu.component';
import { GitspaceFilesComponent } from './components/files-sidebar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GitspaceMenuComponent, GitspaceFilesComponent],
  exports: [GitspaceMenuComponent, GitspaceFilesComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,

    StoreModule.forFeature("gitspace", gitspaceReducer, { initialState: gitspaceInitialState }),
    EffectsModule.forFeature([GitspaceEffects])
  ]
})
export class GitspaceModule {}
