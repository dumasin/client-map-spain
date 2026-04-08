// ===== RUN THESE IN BROWSER CONSOLE TO VERIFY & RESET =====

// 1. Check current clients
console.log('Current clients:', clients.length, clients.map(c => c.name));

// 2. Clear clients array and re-save (DESTRUCTIVE - clears all clients)
// clients = [];
// autoSaveToFirebase();
// console.log('✅ All clients cleared and saved');

// 3. Re-load from Firebase
// location.reload();

// 4. After improved automation runs, verify saves with:
console.log('Final client count:', clients.length);
console.log('Town names:', clients.map(c => c.name).join(', '));
