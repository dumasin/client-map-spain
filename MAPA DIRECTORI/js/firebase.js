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
        clients = clientsSnapshot.docs.map(doc => {
            const clientData = {
                ...doc.data(),
                id: parseInt(doc.id)
            };
            // Migrate old clients without services object (added in v1.1.0)
            if (!clientData.services) {
                clientData.services = {
                    mantenimiento: { active: false, expiryDate: null },
                    adm: { active: false, expiryDate: null }
                };
            }
            return clientData;
        });

        // Load groups from Firebase (or seed defaults on first run)
        const groupsSnapshot = await db.collection('groups').get();
        if (groupsSnapshot.docs.length > 0) {
            groups = groupsSnapshot.docs.map(doc => doc.data());
            console.log(`✅ Loaded ${groups.length} groups from Firebase`);
        } else {
            console.log('📝 No groups in Firebase, seeding defaults...');
            for (const group of groups) {
                await db.collection('groups').doc(group.id).set(group);
            }
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

    const snapshot = await db.collection('clients').get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => { batch.delete(doc.ref); });
    await batch.commit();

    for (const client of clients) {
        await db.collection('clients').doc(client.id.toString()).set(client);
    }
    console.log('💾 Clients saved to Firebase');
}

// Save groups to Firebase
async function saveGroupsToFirebase() {
    if (!db) return;

    const snapshot = await db.collection('groups').get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => { batch.delete(doc.ref); });
    await batch.commit();

    for (const group of groups) {
        await db.collection('groups').doc(group.id).set(group);
    }
    console.log('💾 Groups saved to Firebase');
}

// Auto-save with debounce (silent errors)
let autoSaveTimeout;
function autoSaveToFirebase() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(async () => {
        try {
            await saveClientsToFirebase();
            await saveGroupsToFirebase();
        } catch (e) {
            console.error('Auto-save error:', e);
        }
    }, 1000);
}

// Manual save with UI feedback
async function manualSave() {
    const btn = document.getElementById('manualSaveBtn');
    const status = document.getElementById('saveStatus');

    if (btn) btn.disabled = true;
    if (status) { status.textContent = 'Saving...'; status.className = 'save-status saving'; }

    try {
        await saveClientsToFirebase();
        await saveGroupsToFirebase();
        if (status) { status.textContent = '✅ Saved!'; status.className = 'save-status success'; }
        setTimeout(() => {
            if (status) { status.textContent = ''; status.className = 'save-status'; }
        }, 3000);
    } catch (error) {
        console.error('Manual save error:', error);
        if (status) { status.textContent = '❌ Error saving'; status.className = 'save-status error'; }
    } finally {
        if (btn) btn.disabled = false;
    }
}
