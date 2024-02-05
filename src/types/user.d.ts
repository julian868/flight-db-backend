export interface IUser {
  _id: object;
  name: string;
  email: string;
  photo?: string | null;
  role: "user" | "admin";
  password: string;
  passwordConfirm: string;
}
export interface IUserMethods extends IUser{
  correctPassword(candidatePassword,userPassword): boolean;
}