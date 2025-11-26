import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
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

export class Expense implements OnInit,OnChanges {
  @Input() visible !:boolean
  @Input() expenseItems !: IExpenseItems[]
  @Input() expense!: IExpense
  @Input() isEditing !:boolean
  @Input() isLoading !: boolean
  @Output() closeDialog = new EventEmitter();
  @Output() create:EventEmitter<IExpense> = new EventEmitter();
  @Output() update:EventEmitter<IExpense> = new EventEmitter();
  expenseForm!: FormGroup;
  uploadedFiles: any[] = [];


  constructor(private fb: FormBuilder,private messageService: MessageService ) {}

  ngOnInit() {
    this.initForm()
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes['expense'] && this.expense && this.expenseForm) {
      console.log(changes['expense']);
      this.expenseForm.patchValue({
        // @ts-ignore
        itemId: this.expense.itemId?._id,
        name: this.expense.name,
        price: this.expense.price,
        paymentMethod: this.expense.paymentMethod,
        description: this.expense.description,
        date: this.expense.date ? new Date(this.expense.date) : null,
        viewDescription: !!this.expense.description,
        viewData:!!this.expense.date
      })
    }
  }

  private markAllAsTouched(): void {
    Object.keys(this.expenseForm.controls).forEach((key) => {
      const control = this.expenseForm.get(key);
      control?.markAsTouched();
    });
  }

  createEdit(){
    if (this.expenseForm.invalid) {
      this.markAllAsTouched();
      return;
    }
    if (this.isEditing) {
      const  data = {...this.getExpenseData(),_id:this.expense._id};
      this.update.emit(data)
      return;
    }
    const  data = this.getExpenseData()
    this.create.emit(data);
  }


  getExpenseData():IExpense {
    const formValue = this.expenseForm.value;
    const data: IExpense = {
      itemId: formValue.itemId,
      name : formValue.name,
      price: formValue.price,
      paymentMethod: formValue.paymentMethod
    };
    if (formValue.viewData && formValue.date) data.date = formValue.date;
    if (formValue.viewDescription && formValue.description) data.description = formValue.description;
    if (formValue.viewImage && formValue.receipt_image) data.receipt_image = formValue.receipt_image;
    return data;
  }



  initForm(){
    this.expenseForm = this.fb.group({
      itemId:new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, []),
      price: new FormControl(null, [Validators.required]),
      date: new FormControl('', []),
      paymentMethod: new FormControl(null, [Validators.required]),
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
