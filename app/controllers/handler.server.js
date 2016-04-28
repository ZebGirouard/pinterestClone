'use strict';

var Pins = require('../models/pins.js');
var https = require('https');

function PinHandler () {
	
	this.addPin = function (req, res) {
		console.log(req.params.pinName);
		res.json("Pin saved!");
	};
	/*
	this.removeStock = function (req, res) {
		var symbol = req.params.symbol.toLowerCase();
		Stocks.find({stock_name: symbol}).remove().exec(function (err, result) {
			if (err) {throw err;}
			res.json(result);
		});	
	};
	
	this.addStock = function (req, res) {
		var symbol = req.params.symbol.toLowerCase();
		//Check if stock already in chart list
		Stocks.findOne({stock_name: symbol})
		.exec(function (err, result) {
			if (err) { throw err; }
			if (result) {
				res.json("Stock already in DB.");						
			}
			else {
		        https.get('https://www.highcharts.com/samples/data/jsonp.php?filename=' + symbol.toLowerCase() + '-c.json&callback=?',    function (response) {
				    var bodyChunks = [];
				
				    response.on('data', function(chunk)
				    {
				        // Store data chunks in an array
				        bodyChunks.push(chunk);
				    }).on('error', function(e)
				    {
				        // Call callback function with the error object which comes from the response
				        res.json(e);
				    }).on('end', function()
				    {
				        // Check for real data in the concatenated chunks parsed as a string
				        var fullResponse = Buffer.concat(bodyChunks).toString('utf8');
				        if(fullResponse === "?();") {
				        	res.json("Failed to find stock with name: "+symbol);
				        }
				        // If everything checks out, add stock to list and chart
				        else {
							var stock = new Stocks({stock_name: symbol});
							stock.save(function (err, data) {
								if (err) throw(err);
								else res.json('Saved : ' + data );
							});			        	
				        }
				    });
				}).on('error', function(e) {
				    // Call callback function with the error object which comes from the request
				    res.json(e);
				});			
			}
		});
	};

	this.getStocks = function (req, res) {
		Stocks
			.find()
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
	};
	*/
}

module.exports = PinHandler;
