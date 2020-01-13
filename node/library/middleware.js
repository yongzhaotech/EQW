"use strict";

const origins = {
  "http://www.esaleshome.com": true,
  "http://esaleshome.com": true,
  "www.esaleshome.com": true,
  "esaleshome.com": true,
  "http://localhost:3000": true
};

const accessControl = (req, res, next) => {
  const origin = req.get("origin");
  res.append("Access-Control-Allow-Credentials", true);
  if (origin.toLowerCase() in origins) {
    res.append("Access-Control-Allow-Origin", origin);
  }
  next();
};

exports.accessControl = accessControl;