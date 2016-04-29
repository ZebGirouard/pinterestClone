'use strict';

var Pins = require('../models/pin.js');

function PinHandler () {
	
	this.addPin = function (req, res) {
		console.log(req.body.title);
		console.log(req.body.url);
		//Check if stock already in chart list
		Pins.findOne({url: req.body.url})
		.exec(function (err, result) {
			if (err) { throw err; }
			if (result) {
				res.json("Pin image already in wall.");						
			}
			else {
				var pin = new Pins({title: req.body.title, url: req.body.url, creator: req.body.user});
				pin.save(function (err, data) {
					if (err) throw(err);
					else res.json('Saved : ' + data );
				});			        	
			}
		});
	};
	
	this.getPins = function (req, res) {
		Pins
			.find()
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
	};	
	
	this.removePin = function (req, res) {
		console.log(req.body);
		console.log(req.body._id);
		Pins.findById(req.body._id).remove().exec(function (err, result) {
			if (err) {throw err;}
			res.json(result);
		});	
	};
}

module.exports = PinHandler;
