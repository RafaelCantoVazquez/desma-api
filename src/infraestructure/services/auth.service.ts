import { User } from "../models/user.model";
import { LoginUser, RegisterUser } from "../../core/interfaces/auth/buildAuth.type";
import { HttpError } from "../errors/httpError";
import { generateToken } from "../utils/generateToken";

export const loginUserService: LoginUser = async (authData) => {
  const { email, password } = authData;

  if (!email || !password) {
    throw new HttpError('Some user data fields are missing', 400);
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return{
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new HttpError('Invalid email or password', 400);
  }
};

export const registerUserService: RegisterUser = async (registerData) => {
  const { name, email, password } = registerData;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new HttpError('The email is already associated with a Desma account', 400);
  }

  try {
    const user = await User.create({ name, email, password });

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(error.message, 400);
    }
    throw new Error('An error has occurred while registering a user');
  }
};
