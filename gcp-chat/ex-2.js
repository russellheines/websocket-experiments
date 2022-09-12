const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
    projectId: 'getting-started-337714',
  });  

const chatRef = db.collection('Chats').doc('IEhO2IZhYd2a0kBcBWNx');

chatRef.onSnapshot(docSnapshot => {
    console.log(`Received doc snapshot: ${docSnapshot}`);
    console.log(docSnapshot.data());

    }, err => {
        console.log(`Encountered error: ${err}`);
    }
);