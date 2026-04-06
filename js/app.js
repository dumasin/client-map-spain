// ==========================================
// MAIN APP INITIALIZATION
// ==========================================

// Global state
let clients = [];
let groups = [
    // Catalonia
    { id: 'cat', name: 'Catalonia', parent: null, children: ['prov_barcelona', 'prov_girona', 'prov_lleida', 'prov_tarragona'] },
    
    // Barcelona Province
    { id: 'prov_barcelona', name: 'Barcelona', parent: 'cat', children: ['comarca_barcelones', 'comarca_maresme', 'comarca_valles_occ', 'comarca_valles_or', 'comarca_baix_llob', 'comarca_garraf', 'comarca_anoia', 'comarca_alt_pened', 'comarca_osona', 'comarca_bergueda', 'comarca_moianes'] },
    { id: 'comarca_barcelones', name: 'Barcelonès', parent: 'prov_barcelona', children: [] },
    { id: 'comarca_maresme', name: 'Maresme', parent: 'prov_barcelona', children: [] },
    { id: 'comarca_valles_occ', name: 'Vallès Occidental', parent: 'prov_barcelona', children: [] },
    { id: 'comarca_valles_or', name: 'Vallès Oriental', parent: 'prov_barcelona', children: [] },
    { id: 'comarca_baix_llob', name: 'Baix Llobregat', parent: 'prov_barcelona', children: [] },
    { id: 'comarca_garraf', name: 'Garraf', parent: 'prov_barcelona', children: [] },
    { id: 'comarca_anoia', name: 'Anoia', parent: 'prov_barcelona', children: [] },
    { id: 'comarca_alt_pened', name: 'Alt Penedès', parent: 'prov_barcelona', children: [] },
    { id: 'comarca_osona', name: 'Osona', parent: 'prov_barcelona', children: [] },
    { id: 'comarca_bergueda', name: 'Berguedà', parent: 'prov_barcelona', children: [] },
    { id: 'comarca_moianes', name: 'Moianès', parent: 'prov_barcelona', children: [] },
    
    // Girona Province
    { id: 'prov_girona', name: 'Girona', parent: 'cat', children: ['comarca_gironès', 'comarca_la_selva', 'comarca_ripollès', 'comarca_garrotxa', 'comarca_pla_estany', 'comarca_alt_emporda', 'comarca_baix_emporda', 'comarca_cerdanya'] },
    { id: 'comarca_gironès', name: 'Gironès', parent: 'prov_girona', children: [] },
    { id: 'comarca_la_selva', name: 'La Selva', parent: 'prov_girona', children: [] },
    { id: 'comarca_ripollès', name: 'Ripollès', parent: 'prov_girona', children: [] },
    { id: 'comarca_garrotxa', name: 'Garrotxa', parent: 'prov_girona', children: [] },
    { id: 'comarca_pla_estany', name: 'Pla de l\'Estany', parent: 'prov_girona', children: [] },
    { id: 'comarca_alt_emporda', name: 'Alt Empordà', parent: 'prov_girona', children: [] },
    { id: 'comarca_baix_emporda', name: 'Baix Empordà', parent: 'prov_girona', children: [] },
    { id: 'comarca_cerdanya', name: 'Cerdanya', parent: 'prov_girona', children: [] },
    
    // Lleida Province
    { id: 'prov_lleida', name: 'Lleida', parent: 'cat', children: ['comarca_segria', 'comarca_urgell', 'comarca_pla_urgell', 'comarca_solsones', 'comarca_segarra', 'comarca_conca_barb', 'comarca_noguera', 'comarca_pallars_jussa', 'comarca_pallars_sobira', 'comarca_val_aran', 'comarca_alt_urgell', 'comarca_garrigues'] },
    { id: 'comarca_segria', name: 'Segrià', parent: 'prov_lleida', children: [] },
    { id: 'comarca_urgell', name: 'Urgell', parent: 'prov_lleida', children: [] },
    { id: 'comarca_pla_urgell', name: 'Pla d\'Urgell', parent: 'prov_lleida', children: [] },
    { id: 'comarca_solsones', name: 'Solsonès', parent: 'prov_lleida', children: [] },
    { id: 'comarca_segarra', name: 'Segarra', parent: 'prov_lleida', children: [] },
    { id: 'comarca_conca_barb', name: 'Conca de Barberà', parent: 'prov_lleida', children: [] },
    { id: 'comarca_noguera', name: 'Noguera', parent: 'prov_lleida', children: [] },
    { id: 'comarca_pallars_jussa', name: 'Pallars Jussà', parent: 'prov_lleida', children: [] },
    { id: 'comarca_pallars_sobira', name: 'Pallars Sobirà', parent: 'prov_lleida', children: [] },
    { id: 'comarca_val_aran', name: 'Val d\'Aran', parent: 'prov_lleida', children: [] },
    { id: 'comarca_alt_urgell', name: 'Alt Urgell', parent: 'prov_lleida', children: [] },
    { id: 'comarca_garrigues', name: 'Garrigues', parent: 'prov_lleida', children: [] },
    
    // Tarragona Province
    { id: 'prov_tarragona', name: 'Tarragona', parent: 'cat', children: ['comarca_tarragonès', 'comarca_baix_camp', 'comarca_alt_camp', 'comarca_ribiera_ebre', 'comarca_baix_ebre', 'comarca_montsia'] },
    { id: 'comarca_tarragonès', name: 'Tarragonès', parent: 'prov_tarragona', children: [] },
    { id: 'comarca_baix_camp', name: 'Baix Camp', parent: 'prov_tarragona', children: [] },
    { id: 'comarca_alt_camp', name: 'Alt Camp', parent: 'prov_tarragona', children: [] },
    { id: 'comarca_ribiera_ebre', name: 'Ribiera d\'Ebre', parent: 'prov_tarragona', children: [] },
    { id: 'comarca_baix_ebre', name: 'Baix Ebre', parent: 'prov_tarragona', children: [] },
    { id: 'comarca_montsia', name: 'Montsià', parent: 'prov_tarragona', children: [] }
];
let activeGroup = 'cat';

function updateDisplay() {
    updateGroupsTree();
    updateClientsList();
    updateMapMarkers();
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initFirebase();
    initMap();
    
    // Setup event listeners
    setupSearch();
    setupAddButton();
    setupClientCheckboxes();
    setupMapClickHandlers();
    
    // Setup import button
    const importBtn = document.getElementById('importBtn');
    if (importBtn) {
        importBtn.addEventListener('click', () => {
            if (confirm('Import 178 pre-geocoded towns? (empty projects - you can add manually)')) {
                importPregeocoded();
            }
        });
    }
    
    // Setup group buttons
    const newGroupBtn = document.getElementById('newGroupBtn');
    const deleteGroupBtn = document.getElementById('deleteGroupBtn');
    const saveGroupBtn = document.getElementById('saveGroupBtn');
    const cancelGroupBtn = document.getElementById('cancelGroupBtn');
    const newGroupInput = document.getElementById('newGroupInput');
    const newGroupInputContainer = document.getElementById('newGroupInputContainer');
    const parentGroupSelect = document.getElementById('parentGroupSelect');
    
    if (newGroupBtn) newGroupBtn.addEventListener('click', () => {
        newGroupInputContainer.style.display = 'flex';
        newGroupInput.focus();
        updateParentGroupSelect();
    });
    
    if (cancelGroupBtn) cancelGroupBtn.addEventListener('click', () => {
        newGroupInputContainer.style.display = 'none';
        newGroupInput.value = '';
    });
    
    if (saveGroupBtn) saveGroupBtn.addEventListener('click', createGroup);
    
    if (newGroupInput) newGroupInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') createGroup();
    });
    
    if (deleteGroupBtn) deleteGroupBtn.addEventListener('click', deleteGroup);
    
    // Display version
    const versionDisplay = document.getElementById('versionDisplay');
    if (versionDisplay) {
        versionDisplay.textContent = APP_VERSION;
    }
    
    // Load Firebase data
    if (isFirebaseReady) {
        loadFromFirebase();
    } else {
        // If Firebase not ready, at least update display with default groups
        updateDisplay();
    }
});
