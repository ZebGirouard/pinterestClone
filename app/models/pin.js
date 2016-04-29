'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pin = new Schema({
	title: String,
	url: String
});

module.exports = mongoose.model('Pin', Pin);
