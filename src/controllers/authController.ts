import { type Request, type Response, type CookieOptions, type NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";
import { type ExpressFunction } from "../types/expressFunction";
import type { IUser } from "../types/user";

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.EXPIRES_IN;
const JWT_COOKIE_EXPIRES_IN = Number(process.env.JWT_COOKIE_EXPIRES_IN);

if (!JWT_SECRET || !EXPIRES_IN || !JWT_COOKIE_EXPIRES_IN) {
  throw new Error("JWT is not defined in the environment.");
}

const signToken = (id: object) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
};

const createSendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = signToken(user._id);
  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  //Remove password from output
  user.password = "********";

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup: ExpressFunction = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export const login: ExpressFunction = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password entered
    if (!email || !password) {
      res.status(400).json({
        status: "fail",
        message: "Please enter email and password!",
      });
    }
    // 2) Check if user exists and password is correct
    const user = await User.findOne({ email }).select("+password");

    if (
      !user ||
      !(await user.correctPassword(password, user.password))
    ) {
      res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
      return;
    }
    // 3) If username and password correct, send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
}; 

export const protect: ExpressFunction = async (req, res, next) => {
  try {
    // 1) Get token and check if it's there
    ;
/*     if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } */


    req.headers.authorization = "Bearer " + req.cookies.jwt;
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
      return;
    }

    // 2) Verify token
    const decoded: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const currentUser = await User.findById(decoded.id);
    req.body.user = currentUser;
    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export const restrictTo = (...roles: Array<"admin" | "user">) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //roles ['admin','user']. role = 'user'

    if (!roles.includes(req.body.user.role)) {
      console.log("Current user in restrictTo Function", req.body.user);
      return res.status(401).json({
        status: "fail",
        message: "You do not have permission to perform this action.",
      });
    }
    next();
  };
}; 
