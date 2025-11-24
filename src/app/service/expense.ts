import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {ICategory, IExpenseItems} from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createCategory(category:ICategory):Observable<ICategory>{
    return this.http.post<ICategory>(`${this.baseUrl}/expenses/category`, category);
  }

  getAllCategory():Observable<ICategory[]>{
    return  this.http.get<ICategory[]>(`${this.baseUrl}/expenses/allCategory`);
  }

  createExpenseItem(Items:IExpenseItems):Observable<IExpenseItems> {
    return  this.http.post<IExpenseItems>(`${this.baseUrl}/expenses/item`, Items);
  }

  getAllExpenseItems():Observable<IExpenseItems[]>{
    return  this.http.get<IExpenseItems[]>(`${this.baseUrl}/expenses/allItem`);
  }
}
