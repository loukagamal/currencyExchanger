import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';
import { HomeComponent } from './home/home.component';
import { config } from './config';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: config.page.home,
        component:HomeComponent
      },
      {
        path: `${config.page.currencyDetails}/:from/to/:to`,
        component:CurrencyDetailsComponent
      },
      {
        path: `${config.page.currencyDetails}/:from/to/:to/amount/:amount`,
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
