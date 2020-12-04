import _ from 'lodash';
import nodemailer from 'nodemailer';
import config from '../../config/config';
import jwt from 'jsonwebtoken';

const utils = () => {

    const createToken = (data) => {
        let token = jwt.sign(data, config.jwtSecret, {
            expiresIn: config.jwtTokenExpire
        });
        // token = token.replace(/\./g, "ar4Jq1V");
        return token;
	};
	
    const getUserIdFromToken = (headers) => {
        let token = headers['x-access-token'];
        return new Promise(function (resolve, reject) {
            jwt.verify(token, config.jwtSecret, function (err, result) {
                if (err) {
                    resolve(err)
                } else {
                    resolve(result)
                }
            });
        })
	};
	
    const mailOptions = (mails, message, subject) => {
        let smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            auth: {
                user: config.COMMON_EMAIL,
                pass: config.COMMON_PASSWORD
            }
        });

        let maillist = mails;
        let msg = {
            from: "******",
            subject: subject,
            //text: message, 
            cc: "*******",
            html: message // html body
        }
        maillist.forEach(function (to, i, array) {
            msg.to = to;
            smtpTransport.sendMail(msg, function (err) {
                if (err) {
                    console.log('Email error');
                    console.log('Sending to ' + to + ' failed: ' + err);
                    return;
                } else {
                    console.log('Sent to ' + to);
                }
                if (i === maillist.length - 1) { msg.transport.close(); }
            });
        });
	};
	
	return {
		createToken,
		getUserIdFromToken,
        mailOptions
    }

};

export default utils();