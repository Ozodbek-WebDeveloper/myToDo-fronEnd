import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import  {Router} from '@angular/router';
import {ICategory, IExpenseItems} from '../../../../models/user';


@Component({
  selector: 'app-expenses-nav',
  templateUrl: './expenses-nav.html',
  styleUrl: './expenses-nav.scss',
  standalone:false
})
export class ExpensesNav implements OnInit {
    @Input() Categories!: ICategory[];
    @Input() items!: IExpenseItems[];
    @Output() showCategory = new EventEmitter();
    @Output() showExpensesItems = new EventEmitter();
    @Output() showExpenses = new EventEmitter();
    @Output() changeFilter = new EventEmitter();

    filterItems!:IExpenseItems[]
    selectedCategory!: string | null;
    selectedItems!: string | null;
    constructor( private router: Router) {
    }

    ngOnInit() {

    }

    filter(categoryId: string) {
      this.filterItems = this.items.filter(item => item.categoryId === categoryId);
      this.changeFilter.emit({categoryId: this.selectedCategory});
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
      this.router.navigate(['/'])
  }
}
