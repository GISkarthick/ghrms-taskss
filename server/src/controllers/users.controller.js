import { validationResult } from "express-validator";
import httpStatus from "http-status";
import generatePassword from 'password-generator';
import _ from "lodash";
import userModel from '../models/user.model';
import bcryptService from '../services/bcrypt.service';
import utils from '../helpers/utils';

const userController = () => {

	const listUsers = async (req, res) => {
		try {
			let errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let userInput = req.query;
			let query = {isDeleted: false};
			if (userInput._id || userInput.userId) {
				query._id = userInput._id || userInput.userId;
			}
			if (userInput.role) {
				query.role = userInput.role;
			}
			if (userInput.projectId) {
				query.projectId = userInput.projectId;
			}
			let userData = await userModel.find(query, { password: 0 });
			return res.status(httpStatus.OK).json({ status: httpStatus.OK, data: userData, msg: "Success" });
		} catch (err) {
			console.log("err--:",err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(err.statusCode).json(err);
		}
	};

	const createUser = async (req, res) => {
		try {
			let errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let payload = req.body;
			payload.password = bcryptService.password(payload.password);
			let userData = await userModel.create(payload);
			userData = JSON.parse(JSON.stringify(userData));
			delete userData.password;
			return res.status(httpStatus.OK).json({ status: httpStatus.OK, data: userData, msg: "Success" });
		} catch (err) {
			console.log("errr===>", err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(err.statusCode).json(err);
		}
	};

	const login = async (req, res) => {
		try {
			let errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let payload = req.body;
			let query = { "$and":
				[
					{ isDeleted: false, isActive: true },
					{ "$or": [ {email: payload.email}, {mobile: payload.email} ] }
				]
			};
			let userData = await userModel.findOne(query).lean();
			if (userData && bcryptService.comparePassword(payload.password, userData.password) ) {
				delete userData.password;
				userData.token = utils.createToken(userData);
				return res.status(httpStatus.OK).json({ status: httpStatus.OK, data: userData, msg: "Success" });
			} else {
				return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, msg: "Invalid credentials" });
			}
		} catch (err) {
			console.log("errr===>", err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(err.statusCode).json(err);
		}
	};

	const resetPassword = async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const payload = req.body;
			const newPass = generatePassword(12, false);
			let userData = await userModel.findOneAndUpdate(
				{ email: payload.email, isDeleted: false, isActive: true }, 
				{ $set: { password: bcryptService.password(newPass) } },
				{ new: true, setDefaultsOnInsert: true, runValidators: true }
			);

			if (userData) {

				let htmlTemplate = "<tr>" +
					"<td>" +
						"<p>"+ "Hi, " + userData.name + "</p>" +
						"<br><br>" +
						"<p>" + "Your password has been reset to: " + newPass +
						"<br><br>" +
					"</td>" +
				"</tr>";

				utils.mailOptions([userData.email], htmlTemplate, "Reset QHRMS Password");

				return res.status(httpStatus.OK).json({ status: httpStatus.OK, msg: "New password has been sent to you Email" });
			} else {
				return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, msg: "Invalid Email ID" });
			}

		} catch (err) {
			console.log("errr===>", err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(err.statusCode).json(err);
		}
	};

	const deleteUser = async (req, res) => {
		try {
			let errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw errors.array();
			}
			
			const payload = req.body;
			await userModel.remove(
				{ email: payload.email }
			);
            
			return res.status(httpStatus.OK).json({ status: httpStatus.OK, msg: "Success" });
			
		} catch (err) {
			console.log("errr===>", err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(err.statusCode).json(err);
		}
	}

	return {
		listUsers,
		createUser,
		login,
		resetPassword,
		deleteUser
	};
}
export default userController();

