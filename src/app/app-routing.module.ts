import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found.component';

import { AuthComponent } from './components/auth.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'templates',
    data: { redirectTo: 'modeler', animation: 'TemplatePage' },
    loadChildren: () => import('./templates/templates.module').then(m => m.TemplatesModule)
  },
  {
    path: 'modeler',
    data: { animation: 'ModelerPage' },
    loadChildren: () => import('./modeler/modeler.module').then(m => m.ModelerModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'templates' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
