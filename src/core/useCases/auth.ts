import { User } from '../dtos/user.dto';
import { IAuthData } from '../interfaces/auth/auth.interface';
import { LoginUser, RegisterUser } from '../interfaces/auth/buildAuth.type';

export const authService = Object.freeze({
  makeLoginUser: (buildUser: LoginUser) => makeLoginUser(buildUser),
  makeRegisterUser: (buildUser: RegisterUser) => makeRegisterUser(buildUser),
});

const makeLoginUser =
  (authUser: LoginUser) =>
  async (authData: User): Promise<IAuthData> => {
    const auth = await authUser(authData);
    return auth;
  };

const makeRegisterUser =
  (registerUser: RegisterUser) =>
  async (registerData: User): Promise<IAuthData> => {
    const auth = await registerUser(registerData);
    return auth;
  };
