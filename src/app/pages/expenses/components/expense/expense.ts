import { Component } from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.html',
  styleUrl: './expense.scss',
  standalone:false
})
export class Expense {
  visible: boolean = true;
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' }
  ];
  value = ''
  date: Date | undefined;
  cashier: string = '';
  pizza: boolean = false;
  pizza1: boolean = false;
  pizza2: boolean = false;
}
