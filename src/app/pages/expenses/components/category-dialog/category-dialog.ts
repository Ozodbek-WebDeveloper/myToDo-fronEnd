import { Component, Input, Output,EventEmitter } from '@angular/core';
import {ICategory} from '../../../../models/user';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.html',
  styleUrl: './category-dialog.scss',
  standalone:false
})
export class CategoryDialog {
  @Input() visible !: boolean
  @Input() isLoading!: boolean
  @Output() closeDialog : EventEmitter<any> = new EventEmitter();
  @Output() create:EventEmitter<ICategory> = new EventEmitter();
  category: ICategory = {
    name: '',
  }
  close () : void {
    this.closeDialog.emit();
  }
  createCategory(){
    this.create.emit(this.category)
  }
}
