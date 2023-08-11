import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { HomeComponent } from './home/home.component';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';
import { SharedModule } from '../shared/shared.module';
import { ChartModule } from 'primeng/chart';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    CurrencyDetailsComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ChartModule ,
  ]
})
export class PagesModule { }
