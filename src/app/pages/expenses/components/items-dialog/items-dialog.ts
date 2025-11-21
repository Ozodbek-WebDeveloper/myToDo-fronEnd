import { Component } from '@angular/core';

@Component({
  selector: 'app-items-dialog',
  templateUrl: './items-dialog.html',
  styleUrl: './items-dialog.scss',
  standalone:false
})
export class ItemsDialog {
  visible: boolean = false;

  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' }
  ];
  value = ''

}
