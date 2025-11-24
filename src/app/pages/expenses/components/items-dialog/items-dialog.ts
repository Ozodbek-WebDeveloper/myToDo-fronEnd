import { Component, Input, Output,EventEmitter } from '@angular/core';
import {ICategory, IExpenseItems} from '../../../../models/user';

@Component({
  selector: 'app-items-dialog',
  templateUrl: './items-dialog.html',
  styleUrl: './items-dialog.scss',
  standalone:false
})
export class ItemsDialog {
  @Output() closeDialog:EventEmitter<any> = new EventEmitter();
  @Output() create:EventEmitter<IExpenseItems>  = new EventEmitter();
  @Input() visible !: boolean
  @Input() categories !: ICategory[]
  @Input() isLoading !: boolean
  item:IExpenseItems = {
    categoryId:null,
    name:''
  }

  createItems(){
    // console.log(this.item);
      this.create.emit(this.item);
  }

  close():void{
    this.closeDialog.emit();
  }
}
