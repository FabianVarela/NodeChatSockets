var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/', function (req, res) {
    res.status(200).send('Hi World');
});

var messages = [{
    id: 1,
    text: 'Welcome to node JS and Socket.io private chat',
    nickname: 'Bot - FabianVarela'
}];

io.on('connection', function (socket) {
    console.log('The node with IP ' + socket.handshake.address + ' is connected');

    socket.emit('messages', messages);
    socket.on('add-message', function (data) {
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});

server.listen(6677, function () {
    console.log('the server working on http://localhost:6677');
});
