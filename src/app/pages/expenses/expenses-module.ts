import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {SelectModule} from 'primeng/select';
import {TextareaModule} from 'primeng/textarea';
import {DatePickerModule} from 'primeng/datepicker';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
// components
import { ExpensesRoutingModule } from './expenses-routing-module';
import { Expenses } from './expenses/expenses';
import { ExpensesNav } from './expenses-nav/expenses-nav';
import {CategoryDialog} from './components/category-dialog/category-dialog';
import {ItemsDialog} from './components/items-dialog/items-dialog';
import {Expense} from './components/expense/expense';
@NgModule({
  declarations: [ExpensesNav, Expenses,CategoryDialog,ItemsDialog, Expense],
  imports: [
    CommonModule,
    ButtonModule,
    ExpensesRoutingModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    FormsModule,
    TextareaModule,
    DatePickerModule,
    RadioButtonModule,
    CheckboxModule
  ]
})
export class ExpensesModule { }

