const admin = require('firebase-admin');

// Initialize Firebase Admin
try {
  admin.initializeApp({
    projectId: 'client-map-spain'
  });
  
  const db = admin.firestore();
  
  (async () => {
    try {
      // Get all clients
      const snapshot = await db.collection('clients').get();
      
      console.log(`Total clients in Firebase: ${snapshot.docs.length}`);
      
      // Find and delete Aiguafreda
      for (const doc of snapshot.docs) {
        if (doc.data().name && doc.data().name.includes('Aiguafreda')) {
          console.log(`Deleting: ${doc.data().name} (ID: ${doc.id})`);
          await db.collection('clients').doc(doc.id).delete();
        }
      }
      
      console.log('✅ Cleanup complete');
      process.exit(0);
    } catch (error) {
      console.error('Error:', error);
      process.exit(1);
    }
  })();
} catch (error) {
  console.error('Init error:', error);
  process.exit(1);
}
