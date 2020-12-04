import _ from "lodash";
import express from "express";
import moment from "moment";

import userRoutes from "./users.route";

const router = express.Router(); 

router.get("/healthCheck", (req, res) => res.send("OK"));

const  validateToken = (token) => {
	return new Promise(async (resolve, reject) => {
		const decoded = await authService.decode(token);
		const currentTime = moment().unix();
		console.log("decoded_token", decoded);
		if (decoded && currentTime < decoded.exp) {
			resolve({ status: "true", msg: "Successful Authorization!", decoded });
		} else {
			reject({ status: "false", msg: "Invalid Token" });
		}
	});
}

// router.use((req, res, next) => {
// 	const allowedUrls = [];
// 	if (req.method !== "OPTIONS" && !_.includes(allowedUrls, req.url.split("?")[0])) {
// 		const token = req.headers["Authorization"] || req.headers["authorization"];

// 		validateToken(token).then(
// 			res => {
// 				next();
// 			},
// 			err => {
// 				res.status(403).send({
// 					status: "false",
// 					msg: "Failed to authenticate user",
// 					err
// 				});
// 			}
// 		);
// 	} else {
// 		next();
// 	}
// });

router.use("/users", userRoutes);


export default router;
