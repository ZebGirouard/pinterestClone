'use strict';

var path = process.cwd();
var StockHandler = require(path + '/app/controllers/stockHandler.server.js');

module.exports = function (app, passport) {

	var stockHandler = new StockHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/api/addStock/:symbol')
		.post(stockHandler.addStock);

	app.route('/api/removeStock/:symbol')
		.post(stockHandler.removeStock);
		
	app.route('/api/stocks')
		.get(stockHandler.getStocks);
};
