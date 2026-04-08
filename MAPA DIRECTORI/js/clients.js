// ==========================================
// CLIENT MANAGEMENT
// ==========================================

function setupAddButton() {
    const addBtn = document.getElementById('addBtn');
    const searchInput = document.getElementById('searchInput');
    const projectTypesSection = document.getElementById('projectTypesSection');

    addBtn.addEventListener('click', () => {
        if (!currentSearchResult) return;

        const existingClient = clients.find(c => c.name === currentSearchResult.name);
        if (existingClient) {
            alert('This town is already in the client list!');
            return;
        }

        // Get ONLY project type checkboxes from projectTypesSection
        const projectCheckboxes = projectTypesSection.querySelectorAll('input[type="checkbox"]');
        const projectTypes = Array.from(projectCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // F1: Auto-detect comarca from town name
        // currentSearchResult.name contains JUST the town name (already extracted)
        const townLower = currentSearchResult.name.toLowerCase();
        let detectedComarca = townToComarca[townLower];
        
        if (!detectedComarca) {
            detectedComarca = activeGroup;
            console.warn(`⚠️ Comarca not found for "${currentSearchResult.name}", assigned to current group "${activeGroup}"`);
        } else {
            console.log(`✅ Auto-detected comarca: "${currentSearchResult.name}" → ${detectedComarca}`);
        }

        const client = {
            id: Date.now(),
            name: currentSearchResult.displayName || currentSearchResult.name,  // Use full display name for UI
            lat: currentSearchResult.lat,
            lng: currentSearchResult.lng,
            projects: projectTypes,
            groupId: detectedComarca,
            // F3: Service tracking structure
            services: {
                mantenimiento: {
                    active: false,
                    expiryDate: null
                },
                adm: {
                    active: false,
                    expiryDate: null
                }
            }
        };

        clients.push(client);
        autoSaveToFirebase();
        updateDisplay();
        searchInput.value = '';
        currentSearchResult = null;
        addBtn.disabled = true;
        projectTypesSection.style.display = 'none';
        projectCheckboxes.forEach(cb => cb.checked = false);
    });
}

function setupClientCheckboxes() {
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('client-checkbox')) {
            const clientId = parseInt(e.target.dataset.clientId);
            const projectType = e.target.value;
            const client = clients.find(c => c.id === clientId);
            
            if (e.target.checked) {
                if (!client.projects.includes(projectType)) {
                    client.projects.push(projectType);
                }
            } else {
                client.projects = client.projects.filter(p => p !== projectType);
            }
            
            autoSaveToFirebase();
            updateDisplay();
        }
    });
}

function updateClientsList() {
    // F2: Get all clients from active group + child groups
    const tabClients = getGroupAllClients(activeGroup);
    const clientCount = document.getElementById('clientCount');
    const clientsList = document.getElementById('clientsList');
    
    clientCount.textContent = tabClients.length;

    if (tabClients.length === 0) {
        clientsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📍</div>
                <div>No clients in this group yet</div>
                <div style="font-size: 11px; margin-top: 5px;">Search and add towns to get started</div>
            </div>
        `;
        return;
    }

    clientsList.innerHTML = tabClients
        .map(client => {
            // Defensive: ensure services object exists
            if (!client.services) {
                client.services = {
                    mantenimiento: { active: false, expiryDate: null },
                    adm: { active: false, expiryDate: null }
                };
            }
            const mtnStatus = getServiceStatus(client.services.mantenimiento);
            const admStatus = getServiceStatus(client.services.adm);
            
            return `
            <div class="client-item">
                <div class="client-name">${client.name}</div>
                <div style="margin-bottom: 8px;">
                    ${client.projects.length > 0 
                        ? client.projects.map(proj => `<span class="project-badge ${proj.toLowerCase()}">${proj}</span>`).join(' ')
                        : '<span style="color: #ccc; font-size: 11px;">No projects selected</span>'
                    }
                </div>
                
                <!-- F3: Service Status Display -->
                <div style="background: #f5f5f5; padding: 10px; border-radius: 4px; margin-bottom: 10px; font-size: 12px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <div>
                            <strong>Mantenimiento:</strong> <span style="color: ${mtnStatus.status === 'active' ? '#4CAF50' : mtnStatus.status === 'warning' ? '#ff9800' : '#f44336'}">${mtnStatus.display}</span>
                        </div>
                        <button style="padding: 2px 6px; font-size: 10px; cursor: pointer;" onclick="editService(${client.id}, 'mantenimiento')">Edit</button>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <div>
                            <strong>ADM:</strong> <span style="color: ${admStatus.status === 'active' ? '#4CAF50' : admStatus.status === 'warning' ? '#ff9800' : '#f44336'}">${admStatus.display}</span>
                        </div>
                        <button style="padding: 2px 6px; font-size: 10px; cursor: pointer;" onclick="editService(${client.id}, 'adm')">Edit</button>
                    </div>
                </div>
                
                <div class="project-types">
                    <div class="project-type">
                        <input type="checkbox" data-client-id="${client.id}" value="ALPR" 
                            ${client.projects.includes('ALPR') ? 'checked' : ''} class="client-checkbox">
                        <label>ALPR</label>
                    </div>
                    <div class="project-type">
                        <input type="checkbox" data-client-id="${client.id}" value="CCTV" 
                            ${client.projects.includes('CCTV') ? 'checked' : ''} class="client-checkbox">
                        <label>CCTV</label>
                    </div>
                    <div class="project-type">
                        <input type="checkbox" data-client-id="${client.id}" value="CME" 
                            ${client.projects.includes('CME') ? 'checked' : ''} class="client-checkbox">
                        <label>CME</label>
                    </div>
                    <div class="project-type">
                        <input type="checkbox" data-client-id="${client.id}" value="Residuos" 
                            ${client.projects.includes('Residuos') ? 'checked' : ''} class="client-checkbox">
                        <label>Residuos</label>
                    </div>
                </div>
                <button class="delete-btn" onclick="deleteClient(${client.id})">Remove Client</button>
            </div>
            `;
        }).join('');
}

function deleteClient(clientId) {
    clients = clients.filter(c => c.id !== clientId);
    autoSaveToFirebase();
    updateDisplay();
}
