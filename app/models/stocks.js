'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
	stock_id: String,
	stock_name: String
});

module.exports = mongoose.model('Stock', Stock);
