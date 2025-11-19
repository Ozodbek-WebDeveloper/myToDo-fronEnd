import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesRoutingModule } from './expenses-routing-module';
import { ButtonModule } from 'primeng/button';

// components
import { Axpenses } from './axpenses/axpenses';
import { ExpensesNav } from './expenses-nav/expenses-nav';
@NgModule({
  declarations: [ExpensesNav, Axpenses],
  imports: [
    CommonModule,
    ButtonModule,
    ExpensesRoutingModule,
  ]
})
export class ExpensesModule { }

