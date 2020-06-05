import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { HttpClientModule } from '@angular/common/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { appReducer } from './+state/app.reducer';
import { appInitialState } from './+state/app.init';
import { AppEffects } from './+state/app.effects';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './components/app.component';
import { NavbarComponent } from './components/navbar.component';
import { ToolsComponent } from './components/tools.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AngularSplitModule } from 'angular-split';
import { NgxMdModule } from 'ngx-md';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, ToolsComponent, PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    ToastModule,
    FontAwesomeModule,
    AngularSplitModule.forRoot(),
    NgxMdModule.forRoot(),

    StoreModule.forRoot(
      { app: appReducer },
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictStateSerializability: true,
          strictActionSerializability: true
        },
        initialState: { app: appInitialState }
      }),

    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

    AppRoutingModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIconPacks(fas, far);
  }
}
