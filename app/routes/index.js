'use strict';

var path = process.cwd();
var PinHandler = require(path + '/app/controllers/handler.server.js');

module.exports = function (app, passport) {

	var pinHandler = new PinHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/api/addPin/:pinName')
		.post(pinHandler.addPin);
/*
	app.route('/api/removeStock/:symbol')
		.post(stockHandler.removeStock);
		
	app.route('/api/stocks')
		.get(stockHandler.getStocks);*/
};
