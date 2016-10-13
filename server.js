var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'bower_components')));

var server = app.listen(8000, () => {
	console.log('listening 8000');
})

var io = require('socket.io').listen(server);

var time = 0;
var id = '';

io.sockets.on('connection', (socket) => {

	io.emit('login');

	socket.on('passVideo', (data) => {
		id = data.id;
		if (time > data.time) {
			data.time = time;
		} else {
			time = data.time;
		}
		socket.emit('final', (data));
	})

	socket.on('updatereq', () => {
		io.emit('login');
	})
})