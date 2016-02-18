'use strict';

var app = require('./app'),
	db = require('./db');

var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
var options = {
 key: fs.readFileSync('./key.pem'),
 cert: fs.readFileSync('./cert.pem')
};

// Create a service (the app object is just a callback).

// Create an HTTP service.

// Create an HTTPS service identical to the HTTP service.
var server = https.createServer(options, app).listen(8080);

module.exports = server;