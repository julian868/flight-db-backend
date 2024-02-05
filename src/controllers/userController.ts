import { type ExpressFunction } from "../types/expressFunction";
import User from "../models/userModel";

export const getAllUsers: ExpressFunction = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            results: users.length,
            data: users,
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        })
    }
}
export const deleteUserById: ExpressFunction = async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).end();
    }
    catch(err){
        res.status(404).json({
          status: "fail",
          message: err,
        });
    }
}
export const getUserById: ExpressFunction =async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data:user,
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message:err,
        })
    }
}
export const getUserByEmail: ExpressFunction =async (req,res) => {
    try {
        const user = await User.findOne({ email: req.query.email });
        res.status(200).json({
            status: "success",
            data:user,
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message:err,
        })
    }
}