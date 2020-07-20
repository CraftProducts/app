import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found.component';


const routes: Routes = [
  { path: 'toolbox', data: { redirectTo: 'modeler' }, loadChildren: () => import('templates').then(m => m.TemplatesModule) },
  {
    path: 'modeler', children: [
      { path: '**', loadChildren: () => import('./modeler/modeler.module').then(m => m.ModelerModule) },
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'toolbox' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
