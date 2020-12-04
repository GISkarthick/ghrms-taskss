import express from "express";
import { check, oneOf } from "express-validator";
import usersCtrl from "../controllers/users.controller";

const router = express.Router();

router

	.post("/login", [
		check('email').not().isEmpty().withMessage('email is required'),
		check('password').not().isEmpty().withMessage('password is required')
	], usersCtrl.login)

    .get("/listUsers", [], usersCtrl.listUsers)

    .post("/createUser", [
		check('name').not().isEmpty().withMessage('name is required'),
		check('email').not().isEmpty().withMessage('email is required'),
		check('password').not().isEmpty().withMessage('password is required'),
		check('role').not().isEmpty().withMessage('role is required')
	], usersCtrl.createUser)
    
	.post("/resetPassword", [
		check('email').not().isEmpty().withMessage('email is required')
	], usersCtrl.resetPassword)

	.post("/deleteUser", [
		check('email').not().isEmpty().withMessage('email is required')
	], usersCtrl.deleteUser);

export default router;
