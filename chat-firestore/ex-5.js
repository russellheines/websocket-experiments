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

app.use("/", express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    const query = db.collection('Chats').where('Room', '==', '1').orderBy('Timestamp');

    const observer = query.onSnapshot(querySnapshot => {
        console.log(`Received query snapshot of size ${querySnapshot.size}`);
    
        querySnapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                let data = change.doc.data();
                console.log('New chat: ', data);
                socket.emit('chat message', data.Content);
            }
        });
    
        }, err => {
            console.log(`Encountered error: ${err}`);
        }
    );

    socket.on('chat message', (msg) => {
        const chat = db.collection('Chats').add({
            Room: '1',
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