import { Component,OnInit } from '@angular/core';
import {ICategory, IExpense, IExpenseItems, IExpensePaging} from '../../../models/user';
import {ExpenseService} from '../../../service/expense';
import {finalize} from 'rxjs';
import  {MessageService, ConfirmationService} from 'primeng/api';

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
  isLoadingExpense: boolean = false;
  Categories!: ICategory[] ;
  ExpenseItems!: IExpenseItems [] ;
  ExpensesDate!: IExpense[] ;
  oneExpenses!: IExpense ;
  isEditing: boolean = false;
  paging: IExpensePaging = {
    page:1,
    size:10
  }
  totalPage!:number;
  constructor(private expenseService: ExpenseService, private  messageService: MessageService,private confirmationService: ConfirmationService) {}

  ngOnInit() {
      this.getAllCategories()
      this.getAllexExpenseItems()
      this.getAllExpense()
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
        this.getAllCategories()
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
        this.getAllexExpenseItems()
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

  createExpense(Items:IExpense) {
    this.isLoadingExpense = true
    this.expenseService.createExpense(Items).pipe(
      finalize(() => this.isLoadingExpense = false),
    ).subscribe({
      next: (result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:'Expense Category Created Successfully',
        })
       this.closeExpense()
        this.getAllExpense()
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:'Error creating expense please try again',
        })
      }
    })
  }

  updateExpense(expense:IExpense) {
      this.isLoadingExpense = true
      const  id = expense._id ?? ''
    console.log(expense)
    this.expenseService.updateExpense(id,expense).pipe(
      finalize(() => this.isLoadingExpense = false),
    ).subscribe({
      next: (result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:'Expense Category Updated Successfully',
        })
       this.closeExpense()
        this.getAllExpense()
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:'Error updating expense please try again',
        })
      }
    })
  }

  deleteExpense(id:string) {
    this.expenseService.deleteExpense(id).subscribe({
      next: (result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:'Expense Category Deleted Successfully',
        })
        this.getAllExpense()
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:'Error deleteing expense please try again',
        })
      }
    })
  }

  findOneExpense(id:string) {
    this.isLoadingExpense = true
    this.expenseService.findOneExpense(id).pipe(
      finalize(() => this.isLoadingExpense = false),
    ).subscribe({
      next: (result) => {
          this.oneExpenses = result;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:'Error find  expense please try again',
        })
      }
    })
  }

  getAllExpense(){
    this.expenseService.getAllExpense(this.paging).subscribe({
      next: (result:any) => {
        const  size = this.paging.size || 1
        this.totalPage = Math.ceil(result.total / size);
        this.ExpensesDate = result.res || []
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
  changPaging(num:number) {
    this.paging.page = num;
    this.getAllExpense()
  }
  //-------------------------------------- helper

  changeFilter(params: { itemId: string; categoryId: string }) {
    this.paging.categoryId = params.categoryId
    this.paging.itemId = params.itemId
    this.getAllExpense()
  }

  confirmDeleteExpense(id:string) {
      this.confirmationService.confirm({
        // target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        header: 'Danger Zone',
        icon: 'pi  pi-info-circle',
        rejectLabel: 'Cancel',
        rejectButtonProps:{
          label: 'Cancel',
          severity: 'Secondary',
          outlined: true,
        },
        acceptButtonProps:{
          label: 'Delete',
          severity: 'danger',
        },
        accept:() =>{
            this.deleteExpense(id)
        },
        reject: () => {
        }
      })
  }
  editExpense(id:string) {
    this.viewExpenses = true;
    this.isEditing = true;
    this.findOneExpense(id)
  }

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
    this.isEditing = false;
  }
}
