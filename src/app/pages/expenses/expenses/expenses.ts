import { Component,OnInit } from '@angular/core';
import {ICategory, IExpenseItems} from '../../../models/user';
import {ExpenseService} from '../../../service/expense';
import {finalize} from 'rxjs';
import  {MessageService} from 'primeng/api';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss',
  standalone: false
})
export class Expenses implements OnInit {
  viewCategories: boolean = false;
  viewExpenses: boolean = false;
  viewExpenseItems: boolean = false;
  isLoadingCategories: boolean = false;
  isLoadingExpensesItems: boolean = false;
  Categories!: ICategory[] ;
  ExpenseItems!: IExpenseItems [] ;
  constructor(private expenseService: ExpenseService, private  messageService: MessageService) {}

  ngOnInit() {
      this.getAllCategories()
      this.getAllexExpenseItems()
  }

  createCategory(category:ICategory) {
    this.isLoadingCategories = true
    this.expenseService.createCategory(category).pipe(
      finalize(() => this.isLoadingCategories = false),
    ).subscribe({
      next: (result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:'Expense Category Created Successfully',
        })
        this.viewCategories = false;
      },
      error: (err) =>{
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:'Error creating category please try again',
        })
      }
    });
  }

  getAllCategories() {
    this.expenseService.getAllCategory().subscribe({
      next: (result) => {
        this.Categories = result;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:'Error loading  category please try again',
        })
      }
    })
  }

  createExpenseItem(Items:IExpenseItems) {
    this.isLoadingExpensesItems = true
    this.expenseService.createExpenseItem(Items).pipe(
      finalize(() => this.isLoadingExpensesItems = false),
    ).subscribe({
      next: (result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:'Expense Items Created Successfully',
        })
        this.viewExpenseItems = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:'Error creating expense items please try again',
        })
      }
    })
  }

  getAllexExpenseItems() {
    this.expenseService.getAllExpenseItems().subscribe({
      next: (result) => {
        this.ExpenseItems =result;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:'Error loading  expense please try again',
        })
      }
    })
  }
  //-------------------------------------- helper
  showCategory(){
    this.viewCategories = true;
  }

  showExpensesItems(){
    this.viewExpenseItems = true;
  }

  showExpenses(){
    this.viewExpenses = true;
  }

  closeCategory(){
    this.viewCategories = false;
  }

  closeItems(){
    this.viewExpenseItems = false;
  }

  closeExpense(){
    this.viewExpenses = false;
  }
}
