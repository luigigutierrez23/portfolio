export interface UserLogin {
  user: User;
  token: string;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  password: string;
  status: boolean;
  avatar?: string;
}

export interface UserFormValues {
  email: string;
  password: string;
}
