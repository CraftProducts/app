import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found.component';


const routes: Routes = [
  //{ path: 'templates', data: { redirectTo: 'modeler' }, loadChildren: () => import('templates').then(m => m.TemplatesModule) },
  { path: 'templates', data: { redirectTo: 'modeler' }, loadChildren: () => import('./templates/templates.module').then(m => m.TemplatesModule) },
  { path: 'modeler', loadChildren: () => import('./modeler/modeler.module').then(m => m.ModelerModule) },
  { path: '', pathMatch: 'full', redirectTo: 'templates' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
