import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found.component';

import { environment } from '../environments/environment'

const routes: Routes = [
  { path: 'templates', pathMatch: 'full', redirectTo: `templates/${environment.defaultRepo.owner}/${environment.defaultRepo.repo}` },
  {
    path: 'templates/:owner/:repo',
    data: { redirectTo: 'modeler', animation: 'TemplatePage' },
    loadChildren: () => import('templates').then(m => m.TemplatesModule)
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
