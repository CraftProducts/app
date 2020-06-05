import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found.component';


const routes: Routes = [
  //   { path: 'configurations', component: ConfigurationsComponent },
  //   { path: 'setup', component: SetupComponent },
  { path: 'valueprop', loadChildren: () => import('./valueprop/valueprop.module').then(m => m.ValuepropModule) },
  //   { path: 'browse', canActivate: [AuthenticatedGuard], loadChildren: () => import('./issue/issue.module').then(m => m.IssueModule) },
    { path: '', redirectTo: '/valueprop', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
