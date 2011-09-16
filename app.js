var app = require('express').createServer()
	, io = require('socket.io').listen(app);

app.listen(3000);

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	socket.emit('hello', {others: null});
	socket.broadcast.emit('new user');

	socket.on('send message', function (data) {
		console.log(data);
		socket.broadcast.emit("new message", data);
	});

	socket.on('disconnect', function() {
		socket.broadcast.emit('user left');
	});
});

