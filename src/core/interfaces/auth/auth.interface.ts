export interface ILoginData {
  email: string,
  password: string
};

export type IRegisterData = ILoginData & {
  name: string
};

export type IAuthData = {
  _id: number,
  name: string
  email: string,
  token: string
};