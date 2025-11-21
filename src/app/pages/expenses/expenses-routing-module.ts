import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Expenses } from './expenses/expenses';


const routes: Routes = [
  { path: '', component: Expenses }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
