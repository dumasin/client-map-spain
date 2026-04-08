// Paste this in browser console to debug

console.log('🔍 DEBUGGING CLIENT MAP...\n');

// Check 1: Are clients/groups loaded?
console.log('📊 DATA STATUS:');
console.log(`  Clients: ${clients.length}`);
console.log(`  Groups: ${groups.length}`);
console.log(`  Active Group: ${activeGroup}\n`);

// Check 2: Firebase connection
console.log('🔥 FIREBASE:');
console.log(`  Is ready: ${isFirebaseReady}`);
console.log(`  DB object exists: ${db ? 'YES' : 'NO'}\n`);

// Check 3: First few clients (if any)
if (clients.length > 0) {
    console.log('📍 FIRST 5 CLIENTS:');
    clients.slice(0, 5).forEach(c => {
        console.log(`  - ${c.name} (group: ${c.groupId}, projects: ${c.projects.join(',')})`);
    });
} else {
    console.log('❌ NO CLIENTS FOUND\n');
}

// Check 4: Sample groups
console.log(`\n📂 GROUPS (showing first 5 of ${groups.length}):`);
groups.slice(0, 5).forEach(g => {
    console.log(`  - ${g.name} (id: ${g.id}, children: ${g.children ? g.children.length : 0})`);
});

// Check 5: Try to reload from Firebase manually
console.log('\n🔄 Attempting to reload from Firebase...');
if (isFirebaseReady && db) {
    (async () => {
        try {
            const snap = await db.collection('clients').get();
            console.log(`  Firebase has ${snap.size} clients`);
            snap.docs.slice(0, 3).forEach(doc => {
                console.log(`  - ${doc.data().name}`);
            });
        } catch (e) {
            console.log(`  Error: ${e.message}`);
        }
    })();
} else {
    console.log('  Firebase not ready - cannot check');
}

console.log('\n✅ Debug complete. Check above for issues.');
