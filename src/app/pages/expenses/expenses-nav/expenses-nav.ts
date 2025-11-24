import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-expenses-nav',
  templateUrl: './expenses-nav.html',
  styleUrl: './expenses-nav.scss',
  standalone:false
})
export class ExpensesNav {
    @Output() showCategory = new EventEmitter();
    @Output() showExpensesItems = new EventEmitter();
    @Output() showExpenses = new EventEmitter();

    Category():void{
      this.showCategory.emit();
    }

    ExpensesItems():void{
      this.showExpensesItems.emit();
    }

    Expenses():void{
      this.showExpenses.emit();
    }
}
