// ==========================================
// CONFIGURATION & CONSTANTS
// ==========================================

// Version tracking
const APP_VERSION = '1.1.1';

// Nominatim API for geocoding
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

// Project type colors
const projectColors = {
    'ALPR': '#FF6B6B',
    'CCTV': '#4ECDC4',
    'CME': '#45B7D1',
    'Residuos': '#96CEB4'
};

// Catalonian town to comarca mapping (F1)
const townToComarca = {
    // Barcelonès
    'barcelona': 'comarca_barcelones',
    'sant adrià de besòs': 'comarca_barcelones',
    'l\'hospitalet de llobregat': 'comarca_barcelones',
    'el prat de llobregat': 'comarca_barcelones',
    'cornellà de llobregat': 'comarca_barcelones',
    
    // Maresme
    'mataró': 'comarca_maresme',
    'arenys de mar': 'comarca_maresme',
    'canet de mar': 'comarca_maresme',
    'teià': 'comarca_maresme',
    'malgrat de mar': 'comarca_maresme',
    'santa susanna': 'comarca_maresme',
    'blanes': 'comarca_maresme',
    
    // Vallès Occidental
    'sabadell': 'comarca_valles_occ',
    'terrassa': 'comarca_valles_occ',
    'sant quirze': 'comarca_valles_occ',
    'castellbell i el vilar': 'comarca_valles_occ',
    'sant cugat del vallès': 'comarca_valles_occ',
    
    // Vallès Oriental
    'granollers': 'comarca_valles_or',
    'martorelles': 'comarca_valles_or',
    'montmeló': 'comarca_valles_or',
    'la roca del vallès': 'comarca_valles_or',
    
    // Baix Llobregat
    'begues': 'comarca_baix_llob',
    'corbera de llobregat': 'comarca_baix_llob',
    'sant joan despi': 'comarca_baix_llob',
    'esplugues de llobregat': 'comarca_baix_llob',
    
    // Garraf
    'sitges': 'comarca_garraf',
    'vilanova i la geltrú': 'comarca_garraf',
    'cubelles': 'comarca_garraf',
    
    // Anoia
    'igualada': 'comarca_anoia',
    'vilanova de sau': 'comarca_anoia',
    'piera': 'comarca_anoia',
    
    // Alt Penedès
    'vilafranca del penedès': 'comarca_alt_pened',
    'subirats': 'comarca_alt_pened',
    
    // Osona
    'vic': 'comarca_osona',
    'calldetenes': 'comarca_osona',
    'manlleu': 'comarca_osona',
    
    // Berguedà
    'berga': 'comarca_bergueda',
    'gósol': 'comarca_bergueda',
    
    // Moianès
    'moià': 'comarca_moianes',
    'castellcir': 'comarca_moianes',
    
    // Gironès
    'girona': 'comarca_gironès',
    'salt': 'comarca_gironès',
    'quart': 'comarca_gironès',
    'riudellots de la selva': 'comarca_gironès',
    
    // La Selva
    'santa coloma de farners': 'comarca_la_selva',
    'lloret de mar': 'comarca_la_selva',
    'tossa de mar': 'comarca_la_selva',
    
    // Ripollès
    'ripoll': 'comarca_ripollès',
    'sant joan de les abadesses': 'comarca_ripollès',
    
    // Garrotxa
    'olot': 'comarca_garrotxa',
    'castellfollit de la roca': 'comarca_garrotxa',
    
    // Pla de l\'Estany
    'banyoles': 'comarca_pla_estany',
    'camós': 'comarca_pla_estany',
    
    // Alt Empordà
    'figures': 'comarca_alt_emporda',
    'llançà': 'comarca_alt_emporda',
    'vilajuïga': 'comarca_alt_emporda',
    
    // Baix Empordà
    'la bisbal': 'comarca_baix_emporda',
    'palafrugell': 'comarca_baix_emporda',
    
    // Cerdanya
    'puigcerdà': 'comarca_cerdanya',
    'baga': 'comarca_cerdanya',
    
    // Segrià
    'lleida': 'comarca_segria',
    'almacelles': 'comarca_segria',
    'sucs': 'comarca_segria',
    
    // Urgell
    'tàrrega': 'comarca_urgell',
    'barbens': 'comarca_urgell',
    
    // Pla d\'Urgell
    'mollerussa': 'comarca_pla_urgell',
    'ivars d\'urgell': 'comarca_pla_urgell',
    
    // Solsonès
    'solsona': 'comarca_solsones',
    'riner': 'comarca_solsones',
    
    // Segarra
    'cervera': 'comarca_segarra',
    'calaf': 'comarca_segarra',
    
    // Conca de Barberà
    'montblanc': 'comarca_conca_barb',
    'l\'espluga de francoli': 'comarca_conca_barb',
    
    // Noguera
    'balaguer': 'comarca_noguera',
    'aitona': 'comarca_noguera',
    
    // Pallars Jussà
    'tremp': 'comarca_pallars_jussa',
    'isona': 'comarca_pallars_jussa',
    
    // Pallars Sobirà
    'sort': 'comarca_pallars_sobira',
    'esterri d\'àneu': 'comarca_pallars_sobira',
    
    // Val d\'Aran
    'vielha': 'comarca_val_aran',
    'vilac': 'comarca_val_aran',
    
    // Alt Urgell
    'la seu d\'urgell': 'comarca_alt_urgell',
    'sant julià de lòria': 'comarca_alt_urgell',
    
    // Garrigues
    'alcalà de gurrea': 'comarca_garrigues',
    'torrebesses': 'comarca_garrigues'
};

// Normalize text for accent-insensitive, case-insensitive matching
function normalizeText(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
