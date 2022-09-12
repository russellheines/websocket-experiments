const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'getting-started-337714',
});  

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

app.get('/', (req, res) => {
    const roomId = randomId();
    res.redirect('/chat?roomId=' + roomId);
  });

app.use("/chat", express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    const roomId = socket.handshake.auth.roomId;

    const query = db.collection('Chats').where('Room', '==', roomId).orderBy('Timestamp');

    const observer = query.onSnapshot(querySnapshot => {
        console.log(`Received query snapshot of size ${querySnapshot.size}`);
    
        querySnapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                let data = change.doc.data();
                console.log('New chat: ', data);
                socket.emit('chat', data.Content);
            }
        });
    
        }, err => {
            console.log(`Encountered error: ${err}`);
        }
    );

    socket.on('chat', (msg) => {
        const chat = db.collection('Chats').add({
            Room: roomId,
            Content: msg,
            Timestamp: Firestore.Timestamp.fromDate(new Date())
        });
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
      observer();  // detach listener
    });
    
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});