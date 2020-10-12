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
import { fab } from '@fortawesome/free-brands-svg-icons';
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
import { AppCommonModule } from './appcommon/appcommon.module';

import { GapiSession } from './appcommon/googledrive/gapi.session';
import { AppRepository } from './appcommon/googledrive/app.repository';
import { FileRepository } from './appcommon/googledrive/file.repository';
import { UserRepository } from './appcommon/googledrive/user.repository';
import { IBACKEND_URLS, SharedLibModule } from 'shared-lib';
import { LocalFileComponent } from './components/localfile.component';
import { TemplateInfoComponent } from './components/template-info.component';
import { AuthComponent } from './components/auth.component';
import { SidebarModule } from 'primeng/sidebar';
import { GitspaceModule } from './gitspace/gitspace.module';
import { LocalSpaceComponent } from './components/localspace.component';

export function initGapi(gapiSession: GapiSession) {
  return () => gapiSession.initClient();
}

@NgModule({
  declarations: [
    AuthComponent,
    AppComponent, PageNotFoundComponent,
    NavbarComponent, ToolsComponent, TemplateInfoComponent,
    LocalSpaceComponent, LocalFileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    SidebarModule,
    
    AppCommonModule,
    SharedLibModule,

    NgbModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    ToastModule,
    FontAwesomeModule,
    AngularSplitModule.forRoot(),
    NgxMdModule.forRoot(),

    GitspaceModule,
    
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
    MessageService,
    // { provide: APP_INITIALIZER, useFactory: initGapi, deps: [GapiSession], multi: true },
    GapiSession,
    AppRepository,
    FileRepository,
    UserRepository,
    { provide: IBACKEND_URLS, useValue: environment.backendUrls },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIconPacks(fas, far, fab);
  }
}
