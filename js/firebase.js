// ==========================================
// FIREBASE SETUP & OPERATIONS
// ==========================================

let db = null;
let isFirebaseReady = false;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl_oopl39rjSE99QX5RmobDqDUN7Rurv8",
  authDomain: "client-map-spain.firebaseapp.com",
  projectId: "client-map-spain",
  storageBucket: "client-map-spain.firebasestorage.app",
  messagingSenderId: "324265024594",
  appId: "1:324265024594:web:51cbd7bf7b4cc1f486538b",
  measurementId: "G-RMN34B7JEX"
};

// Initialize Firebase
function initFirebase() {
    if (firebaseConfig.projectId && firebaseConfig.projectId !== "REPLACE_WITH_YOUR_PROJECT_ID") {
        try {
            firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            isFirebaseReady = true;
            console.log('✅ Firebase initialized successfully');
        } catch (error) {
            console.error('❌ Firebase initialization error:', error);
        }
    } else {
        console.warn('⚠️ Firebase not configured. Update firebase.js with your credentials.');
    }
}

// Load data from Firebase on startup
async function loadFromFirebase() {
    if (!db) {
        console.warn('Firebase not initialized');
        return;
    }

    try {
        // Load clients
        const clientsSnapshot = await db.collection('clients').get();
        clients = clientsSnapshot.docs.map(doc => ({
            ...doc.data(),
            id: parseInt(doc.id)
        }));

        // Clear and reinitialize groups from hardcoded Catalonia structure
        console.log('📝 Syncing Catalonia groups to Firebase...');
        const groupsSnapshot = await db.collection('groups').get();
        
        // Delete all existing groups
        const batch = db.batch();
        groupsSnapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        
        // Save all default groups
        for (const group of groups) {
            await db.collection('groups').doc(group.id).set(group);
        }

        console.log('✅ Data loaded from Firebase:', { clients: clients.length, groups: groups.length });
        updateDisplay();
    } catch (error) {
        console.error('Error loading from Firebase:', error);
    }
}

// Save clients to Firebase
async function saveClientsToFirebase() {
    if (!db) return;

    try {
        // Clear existing clients
        const snapshot = await db.collection('clients').get();
        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        // Save new clients
        for (const client of clients) {
            await db.collection('clients').doc(client.id.toString()).set(client);
        }
        console.log('💾 Clients saved to Firebase');
    } catch (error) {
        console.error('Error saving clients:', error);
    }
}

// Save groups to Firebase
async function saveGroupsToFirebase() {
    if (!db) return;

    try {
        // Clear existing groups
        const snapshot = await db.collection('groups').get();
        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        // Save new groups
        for (const group of groups) {
            await db.collection('groups').doc(group.id).set(group);
        }
        console.log('💾 Groups saved to Firebase');
    } catch (error) {
        console.error('Error saving groups:', error);
    }
}

// Auto-save with debounce
let autoSaveTimeout;
function autoSaveToFirebase() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        saveClientsToFirebase();
        saveGroupsToFirebase();
    }, 1000);
}
