import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import indexRouter from "./src/routes/index.route";
import environmentConfig from './config/config.js';
import db from './src/models/db';
const app = express();

db.connect(function(err) {
	if (err){
		console.log(err);
		console.log("!!!!!!!!!!! Failed to connect to DB !!!!!!!!!!!!!");
	}
	else console.log("*********** Connected to DB ***********");
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.disable('etag');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res, next) {
	res.render("index", {
		title: "QHRMS Services Running on Port: " + environmentConfig.port
	});
});
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

app.use(function (req, res, next) {
	var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Content-MD5', 'Content-Length',
		'Response-Time', 'Api-Version', 'Origin', 'X-Requested-With', 'Authorization'];
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", allowHeaders.join(', '));
	res.header("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header("Accept", "application/x-www-form-urlencoded,text/html,application/json,text/plain");
	next();
});

export default app;
