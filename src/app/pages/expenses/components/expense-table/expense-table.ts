import { Component, OnInit,Input } from '@angular/core';
import {IExpense} from '../../../../models/user';
@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.html',
  styleUrls: ['./expense-table.scss'],
  standalone:false
})


export class ExpenseTable implements OnInit{
  @Input() expenses!: IExpense[];

  ngOnInit() {

  }
}


