const { Chess } = require('chess.js')

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use("/", express.static(__dirname + '/public'));

const chess = new Chess();

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', () => {
      socket.emit('fen',chess.fen());
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});