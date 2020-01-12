"use strict";

require('dotenv').config();

const express = require("express"),
	{ server } = require("./library/server"),
	middleWare = require("./library/middleware"),
	port = 888,
	host = "0.0.0.0",
	app = express();

app.use(middleWare.accessControl);

app.get("*", server.fetch);

app.listen(port, host);
