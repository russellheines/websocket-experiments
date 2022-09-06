const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
    projectId: 'getting-started-337714',
  });  

const query = db.collection('Chats').where('Room', '==', '1').orderBy('Timestamp');

const observer = query.onSnapshot(querySnapshot => {
    console.log(`Received query snapshot of size ${querySnapshot.size}`);

    querySnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            console.log('New chat: ', change.doc.data());
        }
        if (change.type === 'modified') {
            console.log('Modified chat: ', change.doc.data());
        }
        if (change.type === 'removed') {
            console.log('Removed chat: ', change.doc.data());
        }
    });

    }, err => {
        console.log(`Encountered error: ${err}`);
    }
);