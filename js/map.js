// ==========================================
// MAP MANAGEMENT
// ==========================================

let map = null;
let markerLayer = null;

function initMap() {
    // Initialize map centered on Mataró, Spain
    map = L.map('map').setView([41.54, 2.44], 8);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
    }).addTo(map);

    markerLayer = L.featureGroup().addTo(map);
}

function updateMapMarkers() {
    markerLayer.clearLayers();

    // F2: Get hierarchical clients (includes children groups)
    const tabClients = getGroupAllClients(activeGroup);

    tabClients.forEach(client => {
        if (client.projects.length === 0) {
            // Gray marker for clients without projects
            const marker = L.circleMarker([client.lat, client.lng], {
                radius: 8,
                fillColor: '#bdbdbd',
                color: '#999',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            });
            marker.bindPopup(`<b>${client.name}</b><br>No projects assigned`);
            markerLayer.addLayer(marker);
        } else {
            // Create a circle marker for each project type
            client.projects.forEach((project, index) => {
                const color = projectColors[project] || '#999';
                const marker = L.circleMarker([client.lat, client.lng], {
                    radius: 8,
                    fillColor: color,
                    color: color,
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                });
                
                const popupText = `
                    <b>${client.name}</b><br>
                    <small>${client.projects.join(', ')}</small>
                `;
                marker.bindPopup(popupText);
                markerLayer.addLayer(marker);
            });
        }
    });
}

// Center map on a client when clicked
function setupMapClickHandlers() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.client-item')) {
            const item = e.target.closest('.client-item');
            const clientName = item.querySelector('.client-name').textContent;
            const client = clients.find(c => c.name === clientName);
            if (client) {
                map.setView([client.lat, client.lng], 12);
            }
        }
    });
}
