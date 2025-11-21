import { Component } from '@angular/core';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.html',
  styleUrl: './category-dialog.scss',
  standalone:false
})
export class CategoryDialog {
  visible: boolean = false;
}
