// Batch import data - paste this in browser console
const townsList = [
"Vilobí d'Onyar","Aiguafreda","Aiguaviva","Albinyana","Alforja","Altafulla","Amer","Anglès","Arbúcies","Arenys de Mar","Esparreguera","Igualada","Olot","Olèrdola","Balenya","Banyeres del Penedès","Banyoles","Begues","Bellver de Cerdanya","Berga","Bescanó","Bigues i Riells","Blanes","Breda","Cabrera d'Anoia","Cadaqués","Calella","Calldetenes","Callus","Camarles","Cambrils","Campelles","Campllong","Camprodon","Camós","Canet d'Adri","Canovelles","Canyelles","Capellades","Cardedeu","Cardona","Castell-Platja D'Aro","Castellar del Vallés","Castellbisbal","Castellcir","Castellgali","Castellnou de Bages","Castelloli","Castellvell del Camp","Castellvi de la Marca","Castelló D'Empuries","Centelles","Cervera","Collsuspina","Corbera de Llobregat","Cornella de Llobregat","Creixell","Cunit","Canoves","El Bruc","Montmany- Figaro","Flaçà","Folgueroles","Fornells de la Selva","Fortià","Girona","Gualba","Jorba","L'Ampolla","Escala, L'","L'Esquirol","La Bisbal d'Empordà","La Garriga","La Granada","La Pera","La Pobla de Claramunt","La Riba","Les Cabanyes","Les Masies de Roda","Planes d'Hostoles","Linyola","Lleida","Llinars del Valles","Lliça D'Amunt","Maià de Montcal","Malgrat de Mar","Manlleu","Manresa","Martorell","Martorelles","Masquefa","Massanes","Matadepera","Mataro","Maçanet de la Selva","Molins de Rei","Molló","Mont-ras","Mont-roig del Camp","Montblanc","Montesquiu","Montgat","Montmelo","Navarcles","Navata","Palafolls","Palafrugell","Palamós","Palau-Solità i Plegamans","Pallejà","Palol de Revardit","Pals","Parets del Vallès","Piera","Pineda de Mar","Prats de Lluçanès","Ribes de Freser","Riells I Viabrea","Riudarenes","Roda de Berà","Sallent","Sant Andreu de la Barca","Sant Aniol de Finestres","San Celoni","Sant Cugat del Vallès","Sant Cugat Sesgarrigues","Sant Feliu de Codines","Sant Feliu de Guixols","Sant Feliu de Pallerols","Sant Fruitos de Bages","Sant Gregori","Sant Hilari Sacalm","Sant Jaume dels Domenys","Sant Joan de Vilatorrada","Sant Julià de Vilatorta","Sant Llorenç d'Hortons","Sant Llorenç de la Muga","Sant Martí de Centelles","Sant Martí de Llèmena","Sant Martí de Tous","Sant Pau de Segúries","Sant Pere de Ribes","Sant Pere de Vilamajor","Sant Pol de Mar","Sant Quinti de Mediona","Sant Quirze de Besora","Sant Quirze del Vallès","Sant Vicenç de Torello","Santa Coloma de Farnérs","Santa Cristina D'Aro","Santa Eugènia de Berga","Santa Eulalia de Ronçana","Santa Margarida de Montbuí","Santa María d'Oló","Santa Maria de Besora","Santa Maria de Palautordera","Santa Oliva","Santa Pau","Santa Perpetua de Mogoda","Santa Susanna","Sarrià de Dalt","Saus Camallera I Llampaies","Sentmenat","Sils","Sitges","Siurana","Solsona","Subirats","Susqueda","Súria","Taradell","Tarragona","Teià","Tordera","Torredembarra","Torrelavit","Torrelles de Llobregat","Torrent","Torroella de Montgri","Tossa de Mar","Vall-llobrega","Vallbona D'Anoia","Vallgorguina","Vallirana","Vallromanes","Valls","Vandellòs i l'Hospitalet de L'Infant","Vidreres","Vidrà","Vilablareix","Viladrau","Vilalba Sasserra","Vilallonga de Ter","Vilanova del Camí","Vilanova del Vallès","Vilaverd","El Far d'Empordà","Juncosa de Montmell","El Morell","El Palau d'Anglesola","El Papiol","El Pla del Penedès","El Vendrell","Els Pallaresos","El Pla de Santa Maria","La Cellera de Ter","El Pont de Vilomara I Rocafort","Sant Julià del Llor i Bonmatí","Sant Salvador de Guardiola"
];

async function batchAddTowns() {
    console.log(`📋 Starting batch import of ${townsList.length} towns...`);
    let addedCount = 0, skippedCount = 0;

    for (const town of townsList) {
        const existing = clients.find(c => c.name.toLowerCase() === town.toLowerCase());
        if (existing) { skippedCount++; continue; }

        try {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent('https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(town) + ', Spain&format=json&limit=1')}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();

            if (data.length > 0) {
                const result = data[0];
                const townName = town.split(',')[0].trim().toLowerCase();
                const client = {
                    id: Date.now() + Math.random(),
                    name: result.display_name,
                    lat: parseFloat(result.lat),
                    lng: parseFloat(result.lon),
                    projects: [],
                    groupId: townToComarca[townName] || 'cat',
                    services: { mantenimiento: { active: false, expiryDate: null }, adm: { active: false, expiryDate: null } }
                };
                clients.push(client);
                addedCount++;
                console.log(`✅ Added: ${town}`);
            } else {
                skippedCount++;
                console.log(`⚠️ Not found: ${town}`);
            }
        } catch (error) {
            skippedCount++;
            console.log(`❌ Error: ${town}`);
        }
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log(`\n✅ Done! Added: ${addedCount}, Skipped: ${skippedCount}`);
    autoSaveToFirebase();
    updateDisplay();
}

batchAddTowns();
