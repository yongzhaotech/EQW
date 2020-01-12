"use strict";

const { sql } = require("./sql"),
	rateLimit = require("./ratelimit");

const fetch = (req, res) => {

	const { path, ip } = req;

	/*if the number of the requests from this ip address exceeds rate limiting, reject*/
	if (!rateLimit.allowRequest(ip)) {
		res.send({ error: rateLimit.denyMessage() });
		return;
	}

	sql.fetch(path)
		.then(data => {
			res.send(data);
		})
		.catch(error => {
			res.send(error);
		});

};

exports.server = {
	fetch
};