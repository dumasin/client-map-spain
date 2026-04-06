// ==========================================
// SEARCH & TOWN DETECTION
// ==========================================

let currentSearchResult = null;
let searchTimeout;
let lastQuery = '';

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const addBtn = document.getElementById('addBtn');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            searchResults.classList.remove('active');
            addBtn.disabled = true;
            currentSearchResult = null;
            clearTimeout(searchTimeout);
            return;
        }

        // Debounce search
        clearTimeout(searchTimeout);
        searchResults.innerHTML = '<div style="padding: 10px; text-align: center; font-size: 12px; color: #999;">🔍 Searching...</div>';
        searchResults.classList.add('active');

        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 400);
    });
}

function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    const addBtn = document.getElementById('addBtn');

    fetch(`${NOMINATIM_URL}?q=${encodeURIComponent(query)}, Spain&format=json&limit=8`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                searchResults.innerHTML = '<div style="padding: 10px; color: #999;">No results found</div>';
                addBtn.disabled = true;
                return;
            }

            const results = data.map((result, index) => `
                <div class="search-result" onclick="selectSearchResult('${result.display_name}', ${result.lat}, ${result.lon}, ${index})">
                    <div class="result-name">${result.display_name}</div>
                    <div class="result-coords">📍 ${Number(result.lat).toFixed(2)}, ${Number(result.lon).toFixed(2)}</div>
                </div>
            `).join('');

            searchResults.innerHTML = results;
            addBtn.disabled = true;
        })
        .catch(error => {
            console.error('Search error:', error);
            searchResults.innerHTML = '<div style="padding: 10px; color: #f44336;">Search error. Try again.</div>';
        });
}

function selectSearchResult(name, lat, lng, index) {
    const searchResults = document.getElementById('searchResults');
    const addBtn = document.getElementById('addBtn');
    const searchInput = document.getElementById('searchInput');

    currentSearchResult = { name, lat, lng };
    
    // Show selected result
    searchResults.classList.add('active');
    searchResults.innerHTML = `
        <div class="search-result selected">
            <div class="result-name">${name}</div>
            <div class="result-coords">📍 ${Number(lat).toFixed(2)}, ${Number(lng).toFixed(2)}</div>
        </div>
    `;
    
    addBtn.disabled = false;
    searchInput.value = name;
    
    // Show project types section
    const projectTypesSection = document.getElementById('projectTypesSection');
    if (projectTypesSection) {
        projectTypesSection.style.display = 'block';
    }
}
