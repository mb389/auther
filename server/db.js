'use strict';
var dotenv = require('dotenv').config();
var mongoose = require('mongoose');
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);

var databaseURI = process.env.db_URI;

var db = mongoose.connect(databaseURI).connection;

db.on('open', function () {
	console.log('Database connection successfully opened');
});

db.on('error', function (err) {
	console.error('Database connection error', err);
});

module.exports = db;
