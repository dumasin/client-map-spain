// Run this in browser console to fix duplicates and comarca assignments

async function cleanupAndFixClients() {
    console.log('🧹 Starting cleanup...');
    
    // Step 1: Remove duplicates (keep first occurrence)
    let duplicates = [];
    let seen = new Set();
    
    for (let i = clients.length - 1; i >= 0; i--) {
        const client = clients[i];
        const nameKey = client.name.toLowerCase().trim();
        
        if (seen.has(nameKey)) {
            console.log(`🔴 Duplicate found: ${client.name}`);
            duplicates.push(client.id);
            clients.splice(i, 1);
        } else {
            seen.add(nameKey);
        }
    }
    
    console.log(`✅ Removed ${duplicates.length} duplicates`);
    
    // Step 2: Fix comarca assignments
    let fixed = 0;
    let unfixed = 0;
    
    for (let i = 0; i < clients.length; i++) {
        const client = clients[i];
        
        // Extract town name from display_name (format: "Town, Region, ...")
        const townName = client.name.split(',')[0].trim().toLowerCase();
        
        // Look up correct comarca
        const correctComarca = townToComarca[townName];
        
        if (correctComarca && client.groupId !== correctComarca) {
            console.log(`📍 Fixed: ${client.name}`);
            console.log(`   Before: ${client.groupId} → After: ${correctComarca}`);
            client.groupId = correctComarca;
            fixed++;
        } else if (!correctComarca && client.groupId !== 'cat') {
            // If not in mapping, assign to root
            console.log(`⚠️ Auto-mapping failed for: ${client.name} (keeping at ${client.groupId})`);
            unfixed++;
        }
    }
    
    console.log(`✅ Fixed comarca for ${fixed} clients`);
    if (unfixed > 0) {
        console.log(`⚠️ ${unfixed} clients couldn't be auto-mapped (staying in current group)`);
    }
    
    // Step 3: Save to Firebase
    console.log('💾 Saving to Firebase...');
    await autoSaveToFirebase();
    
    // Step 4: Refresh UI
    console.log('🔄 Refreshing display...');
    updateDisplay();
    
    console.log(`\n✅ Cleanup complete!`);
    console.log(`Total clients: ${clients.length}`);
    console.log(`Duplicates removed: ${duplicates.length}`);
    console.log(`Comarca fixes: ${fixed}`);
}

// Run it
cleanupAndFixClients();
