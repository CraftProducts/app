import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found.component';


const routes: Routes = [
  { path: 'valueprop', loadChildren: () => import('./valueprop/valueprop.module').then(m => m.ValuepropModule) },
  { path: 'journeys', loadChildren: () => import('./journeys/journeys.module').then(m => m.JourneysModule) },
  { path: '', redirectTo: '/journeys', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
