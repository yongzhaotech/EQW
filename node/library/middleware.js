"use strict";

const accessControl = (req, res, next) => {
	res.append("Access-Control-Allow-Credentials", true);
	res.append("Access-Control-Allow-Origin", "*");
	next();
};

exports.accessControl = accessControl;