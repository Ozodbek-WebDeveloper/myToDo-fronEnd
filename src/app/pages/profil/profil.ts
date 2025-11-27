import {IgetUser, Ipaging} from '../../models/user';
import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';
import { ButtonModule } from 'primeng/button';
import {Router, RouterLink} from "@angular/router";
import { UserTable } from '../../components/user-table/user-table';
import { MessageService,ConfirmationService } from 'primeng/api';
import {Paging} from '../../components/paging/paging';
import {ConfirmDialog} from 'primeng/confirmdialog';
@Component({
  selector: 'app-profil',
  imports: [FormsModule, FontAwesomeModule, ButtonModule, RouterLink, UserTable, Paging, ConfirmDialog],
  templateUrl: './profil.html',
  styleUrl: './profil.scss',
  providers:[ConfirmationService]
})

export class Profil implements OnInit {
  constructor(private auth: AuthService, private messageService: MessageService, private confirmationService: ConfirmationService,) { }
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.me()
    this.getAllUser()
  }
  baseApi = environment.baseApi + '/static/'
  user: IgetUser = {
    name: 'John doe',
    email: '@example.com',
    roles: 'Frontend Developer',
  };
  users!: IgetUser[]
  isEditing: boolean = false
  faPen = faPen
  preview: string | null = null
  viewPage: number = 0
  isLoading: boolean = false
  async me() {
    const res = await this.auth.getMe()
    this.user = res
    console.log('my user', this.user);
  }
  userPaging:Ipaging ={
    page:1,
    size:10
  }
  totalPage!:number
  editUser() {
    this.isEditing = true
  }


   async changesPaging(num: number) {
    this.userPaging.page = num;
     await this.getAllUser()
    console.log(this.users)
  }
  async saveChanges() {
    const userId = this.user._id ?? ''
    console.log(this.user);
    const res = await this.auth.editMe(userId, this.user)
    this.isEditing = false
  }

  AvatarClick() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    } else {
      console.warn('⚠️ fileInput hali tayyor emas!');
    }
  }

  selectedFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]

    if (!file) return
    this.user.avatar = file
    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.preview = e.target.result;
    };
    reader.readAsDataURL(file)
  }

  async getAllUser() {
    const { res = [], total = 0 } = await this.auth.getAllUser(this.userPaging);

    this.users = [...res];

    const size = this.userPaging.size || 1;
    this.totalPage = Math.ceil(total / size);
  }

  async updateUser(data: { id: string, date: IgetUser }) {
    try {
      const res = await this.auth.editMe(data.id, data.date)
      if (res?.data !== null) {
        await this.getAllUser();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User Successfuly update.'
        })
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Something went wrong, please try again.'
        })
      }
    } catch (error) {
      console.log(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to update user.'
      })
    }
  }

  async deleteUser(id: string) {
    try {
      const res = await this.auth.deleteUser(id)
      if (res?.data !== null) {
        await this.getAllUser()
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User Successfuly delete.'
        })
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Something went wrong, please try again.'
        })
      }
    } catch (error) {
      console.log(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to delete user.'
      })
    }
  }

  async confirmDeleteExpense(id:string) {
    this.confirmationService.confirm({
      // target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi  pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps:{
        label: 'Cancel',
        severity: 'Secondary',
        outlined: true,
      },
      acceptButtonProps:{
        label: 'Delete',
        severity: 'danger',
      },
      accept:() =>{
        this.deleteUser(id)
      },
      reject: () => {
      }
    })
  }


}

