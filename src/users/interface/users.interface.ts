export interface ICreateUser {
  id: string;
  email: string;
  password: string;
}

export interface IAllUser {
  id: string;
  email: string;
  password: string;
}

export interface IUpdateUser {
  email?: string;
  password?: string;
}

export interface Iid {
  id: string;
}
