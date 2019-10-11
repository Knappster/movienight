const path = require('path');
const express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
var clients = {};

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/movienight-client/index.html')
});

app.use('/dist', express.static(path.join(__dirname, '/movienight-client/dist')));

http.listen(3000, () => {
	console.log('Listening on port *: 3000');
});

io.on('connection', (socket) => {
	clients[socket.client.id] = {
		name: 'Anonymous'
	};
	io.emit('clients', clients);

	socket.on('disconnect', () => {
		delete clients[socket.client.id];
		io.emit('clients', clients);
	});

	socket.on('chatMessage', (data) => {
		socket.broadcast.emit('chatMessage', data);
	});

	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', data);
	});

	socket.on('stopTyping', () => {
		socket.broadcast.emit('stopTyping');
	});

	socket.on('joined', (data) => {
		clients[socket.client.id].name = data;
		io.emit('clients', clients);
		socket.broadcast.emit('joined', data);
	});

	socket.on('leave', (data) => {
		socket.broadcast.emit('leave', data);
	});

});
