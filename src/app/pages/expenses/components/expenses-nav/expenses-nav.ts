import { Component,Output,EventEmitter } from '@angular/core';
import  {Router} from '@angular/router';


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

    constructor( private router: Router) {
    }
    Category():void{
      this.showCategory.emit();
    }

    ExpensesItems():void{
      this.showExpensesItems.emit();
    }

    Expenses():void{
      this.showExpenses.emit();
    }

  gotoHome():void{
      this.router.navigate(['/']);
  }
}
