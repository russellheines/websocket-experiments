const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'getting-started-337714',
});

console.log('start');

async function quickstart() {
    const chatRef = db.collection('Chats').doc('JTg0spcZTVtFzQgs2d3y');
    const doc = await chatRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
}

quickstart();

console.log('end');