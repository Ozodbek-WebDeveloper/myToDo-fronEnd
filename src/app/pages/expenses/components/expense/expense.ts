import { Component,Input,Output,EventEmitter, OnInit   } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IExpense, IExpenseItems} from '../../../../models/user';
import {MessageService} from 'primeng/api';
import {FileUploadEvent} from 'primeng/fileupload';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.html',
  styleUrl: './expense.scss',
  standalone:false
})

export class Expense implements OnInit {
  @Input() visible !:boolean
  @Input() expenseItems !: IExpenseItems[]
  @Output() closeDialog = new EventEmitter();

  expenseForm!: FormGroup;
  uploadedFiles: any[] = [];
  value = ''

  constructor(private fb: FormBuilder,private messageService: MessageService ) {
  }

  ngOnInit() {
    this.initForm()
  }

  createExpense(){
    console.log(this.getExpenseData())
  }

  getExpenseData(): Partial<IExpense> {
    const formValue = this.expenseForm.value;
    const data: Partial<IExpense> = {};
     data.itemId = formValue.itemId;
     data.name = formValue.name;
     data.price = formValue.price;
     data.paymentMethod = formValue.paymentMethod;
    if (formValue.viewData && formValue.date) data.date = formValue.date;
    if (formValue.viewDescription && formValue.description) data.description = formValue.description;
    if (formValue.viewImage && formValue.receipt_image) data.receipt_image = formValue.receipt_image;
    return data;
  }



  initForm(){
    this.expenseForm = this.fb.group({
      itemId:new FormControl(null, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      price: new FormControl('', [Validators.required]),
      date: new FormControl('', []),
      paymentMethod: new FormControl('', [Validators.required]),
      receipt_image: new FormControl('', []),
      viewData: [false],
      viewDescription: [false],
      viewImage: [false],
    })
  }

  onUpload(event: FileUploadEvent) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  close():void{
    this.closeDialog.emit();
  }
}
