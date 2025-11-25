export interface IUser {
    name?: string | null
    email?: string | null
    password?: string | null,
}

export interface IgetUser {
    _id?: string  | null;
    avatar?: string |File | null,
    email?: string | null,
    isActive?: boolean,
    name?: string | null,
    roles?: string | null
}

export interface Ipaging {
    page: number | null,
    size: number | null,
    priority: string | null,
    isCompleted: boolean
}

export interface Itodo {
    title: string | null,
    description: string | null,
    priority: string | null
}


export interface ICategory {
  _id?: string | null,
  name: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
}


export interface IExpenseItems{
  _id?: string | null,
  categoryId: string | null,
  name: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
}


export  interface  IExpense{
  _id?: string | null,
  itemId: string | null,
  name: string | null,
  description?:string | null,
  price: number | null,
  date?:string | null,
  paymentMethod: string | null,
  receipt_image?: string | null,
  createdAt?: string | null,
  updatedAt?:string | null,
}

