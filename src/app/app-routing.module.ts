import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { AppComponent } from './components/app.component';
import { WorkbenchComponent } from './components/workbench.component';


const routes: Routes = [
  {
    path: 'tools',
    //data: { redirectTo: 'workbench' },
    loadChildren: () => import('templates').then(m => m.TemplatesModule)
  },
  //{path: 'workbench', component: WorkbenchComponent, children: [
  { path: 'valueprop', loadChildren: () => import('./valueprop/valueprop.module').then(m => m.ValuepropModule) },
  // { path: 'journeymaps', loadChildren: () => import('./journeys/journeys.module').then(m => m.JourneysModule) },
  //]},
  { path: '', pathMatch: 'full', redirectTo: 'tools' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
