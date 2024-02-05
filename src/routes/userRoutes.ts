import express from "express";
import { deleteUserById, getAllUsers, getUserByEmail, getUserById } from "../controllers/userController";
import {
  signup,
  login,
  protect,
  restrictTo,
} from "../controllers/authController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.route("/").get(protect, restrictTo("admin"), getAllUsers);
router.route("/").get(getAllUsers);
router.route("/findBy").get(protect, restrictTo('admin'), getUserByEmail);
router.route("/:id")
    .delete(protect, restrictTo("admin"), deleteUserById)
    .get(protect, restrictTo('admin'), getUserById);

export default router;
