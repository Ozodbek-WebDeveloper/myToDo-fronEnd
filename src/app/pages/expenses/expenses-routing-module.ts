import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Axpenses } from './axpenses/axpenses';


const routes: Routes = [
  { path: '', component: Axpenses }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
