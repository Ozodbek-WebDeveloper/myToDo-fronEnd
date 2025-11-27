import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {SelectModule} from 'primeng/select';
import {TextareaModule} from 'primeng/textarea';
import {DatePickerModule} from 'primeng/datepicker';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {Toast} from 'primeng/toast';
import {FileUpload} from 'primeng/fileupload';
import {Message} from 'primeng/message';
import {TableModule} from 'primeng/table';
import { RippleModule} from 'primeng/ripple';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
// components
import { ExpensesRoutingModule } from './expenses-routing-module';
import { Expenses } from './expenses/expenses';
import { ExpensesNav } from './components/expenses-nav/expenses-nav';
import {CategoryDialog} from './components/category-dialog/category-dialog';
import {ItemsDialog} from './components/items-dialog/items-dialog';
import {Expense} from './components/expense/expense';
import {ExpenseTable} from './components/expense-table/expense-table';
import {Paging} from "../../components/paging/paging";
@NgModule({
  declarations: [ExpensesNav, Expenses,CategoryDialog,ItemsDialog, Expense,ExpenseTable],
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
        CheckboxModule,
        Toast,
        ReactiveFormsModule,
        FileUpload,
        Message,
        TableModule,
        RippleModule,
        ConfirmDialogModule,
        Paging
    ],
  providers: [
    ConfirmationService
  ]
})
export class ExpensesModule {

}

