import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {IExpense} from '../../../../models/user';
@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.html',
  styleUrls: ['./expense-table.scss'],
  standalone:false
})


export class ExpenseTable implements OnInit{
  @Input() expenses: IExpense[] = [];
  @Output() editExpense : EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteExpense : EventEmitter<string> = new EventEmitter<string>();
  ngOnInit() {
  }

  edit(id:string){
    this.editExpense.emit(id);
  }

  delete(id:string){
    this.deleteExpense.emit(id);
  }
}


