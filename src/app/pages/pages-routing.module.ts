import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component:HomeComponent
      },
      {
        path: 'currency-details/:from/to/:to',
        component:CurrencyDetailsComponent
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ],

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
