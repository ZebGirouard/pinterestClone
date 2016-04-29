'use strict';

var express = require('express'),
	routes = require('./app/routes/index.js'),
	mongoose = require('mongoose'),
	session = require('express-session'),
	http = require('http'),
	sio = require('socket.io'),
	bodyParser = require('body-parser'),
	passport = require('passport');

var app = express();

require('dotenv').load();
require('./app/config/passport')(passport);

var mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;

mongoose.connect(mongoURI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

// Configuring Passport
app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app, passport);

var port = process.env.PORT || 8080;	
// create http server
var server = http.createServer(app),

// create socket server
io = sio.listen(server);

// set socket.io debugging

io.sockets.on('connection', function (socket) {

  socket.on('clientCall', function (data) {
  	io.sockets.emit('serverResponse', { message: 'Pins updated!' });
  });

});	

server.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
