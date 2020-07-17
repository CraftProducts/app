import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found.component';


const routes: Routes = [
  { path: 'tools', data: { breadcrumb: 'show' }, loadChildren: () => import('templates').then(m => m.TemplatesModule) },
  // { path: 'valueprop', loadChildren: () => import('./valueprop/valueprop.module').then(m => m.ValuepropModule) },
  // { path: '', pathMatch: 'full', redirectTo: 'tools' },
  // { path: '**', component: PageNotFoundComponent }
  { path: '**', loadChildren: () => import('./modeler/modeler.module').then(m => m.ModelerModule) },
  { path: '', pathMatch: 'full', redirectTo: 'tools' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
