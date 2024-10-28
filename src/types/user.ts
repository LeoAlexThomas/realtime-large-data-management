export enum UserRoleEnum {
  user = "user",
  admin = "admin",
  manager = "manager",
}

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  role: UserRoleEnum;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}
