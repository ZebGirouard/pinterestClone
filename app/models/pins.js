'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pin = new Schema({
	pin_name: String
});

module.exports = mongoose.model('Pin', Pin);
