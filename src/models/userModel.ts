import { type InferSchemaType, Schema, model } from "mongoose";
import validator from "validator";
import { IUserMethods, type IUser } from "../types/user";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name Required!"],
  },
  email: {
    type: String,
    required: [true, "Email Required!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Email Invalid!"],
  },
    photo: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password Required!"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please Confirm Password!"],
    validate: {
      validator: function (this: IUser, inputValue: string) {
        return inputValue === this.password;
      },
      message: "Passwords Do Not Match!",
    },
  },
});

userSchema.methods.correctPassword = async (
  candidatePassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
      next();
      return;
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = "********";
    next();
});

//type User  = InferSchemaType<typeof userSchema>;

interface User extends IUser, IUserMethods { }

export default model<User>("User", userSchema);
