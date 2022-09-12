const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'getting-started-337714',
});

console.log('start');

async function getDocument() {
    const chatRef = db.collection('Chats').doc('IEhO2IZhYd2a0kBcBWNx');
    const doc = await chatRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
}

getDocument();

console.log('end');