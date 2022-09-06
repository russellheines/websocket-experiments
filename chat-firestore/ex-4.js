const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
    projectId: 'getting-started-337714',
  });  

async function quickstart() {
    const chat = await db.collection('Chats').add({
        Room: '1',
        Content: 'abcdefg',
        Timestamp: Firestore.Timestamp.fromDate(new Date())
      });

    console.log('Added document with ID: ', chat.id);
}

quickstart();
  
