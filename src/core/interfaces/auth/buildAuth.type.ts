import { IAuthData, ILoginData, IRegisterData } from './auth.interface';

export type LoginUser = (userData: ILoginData) => Promise<IAuthData>;
export type RegisterUser = (userData: IRegisterData) => Promise<IAuthData>;
