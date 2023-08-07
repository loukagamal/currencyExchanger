import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  {
  path: 'error',
  loadChildren: () =>
    import('./error/error.module').then((m) => m.ErrorModule),
},
{
  path: 'dashboard',
  loadChildren: () =>
    import('./pages/pages.module').then((m) => m.PagesModule),
},
{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
},
{ path: '**', redirectTo: 'error/404' },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
