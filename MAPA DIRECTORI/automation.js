const { chromium } = require('playwright');

const towns = [
  "Vilobí d'Onyar", "Aiguafreda", "Aiguaviva", "Albinyana", "Alforja", "Altafulla", "Amer", "Anglès", "Arbúcies", "Arenys de Mar",
  "Esparreguera", "Igualada", "Olot", "Olèrdola", "Balenya", "Banyeres del Penedès", "Banyoles", "Begues", "Bellver de Cerdanya", "Berga",
  "Bescanó", "Bigues i Riells", "Blanes", "Breda", "Cabrera d'Anoia", "Cadaqués", "Calella", "Calldetenes", "Callus", "Camarles",
  "Cambrils", "Campelles", "Campllong", "Camprodon", "Camós", "Canet d'Adri", "Canovelles", "Canyelles", "Capellades", "Cardedeu",
  "Cardona", "Castell-Platja D'Aro", "Castellar del Vallés", "Castellbisbal", "Castellcir", "Castellgali", "Castellnou de Bages", "Castelloli", "Castellvell del Camp", "Castellvi de la Marca",
  "Castelló D'Empuries", "Centelles", "Cervera", "Collsuspina", "Corbera de Llobregat", "Cornella de Llobregat", "Creixell", "Cunit", "Canoves", "El Bruc",
  "Montmany- Figaro", "Flaçà", "Folgueroles", "Fornells de la Selva", "Fortià", "Girona", "Gualba", "Jorba", "L'Ampolla", "Escala, L'",
  "L'Esquirol", "La Bisbal d'Empordà", "La Garriga", "La Granada", "La Pera", "La Pobla de Claramunt", "La Riba", "Les Cabanyes", "Les Masies de Roda", "Planes d'Hostoles",
  "Linyola", "Lleida", "Llinars del Valles", "Lliça D'Amunt", "Maià de Montcal", "Malgrat de Mar", "Manlleu", "Manresa", "Martorell", "Martorelles",
  "Masquefa", "Massanes", "Matadepera", "Mataro", "Maçanet de la Selva", "Molins de Rei", "Molló", "Mont-ras", "Mont-roig del Camp", "Montblanc",
  "Montesquiu", "Montgat", "Montmelo", "Navarcles", "Navata", "Palafolls", "Palafrugell", "Palamós", "Palau-Solità i Plegamans", "Pallejà",
  "Palol de Revardit", "Pals", "Parets del Vallès", "Piera", "Pineda de Mar", "Prats de Lluçanès", "Ribes de Freser", "Riells I Viabrea", "Riudarenes", "Roda de Berà",
  "Sallent", "Sant Andreu de la Barca", "Sant Aniol de Finestres", "San Celoni", "Sant Cugat del Vallès", "Sant Cugat Sesgarrigues", "Sant Feliu de Codines", "Sant Feliu de Guixols", "Sant Feliu de Pallerols", "Sant Fruitos de Bages",
  "Sant Gregori", "Sant Hilari Sacalm", "Sant Jaume dels Domenys", "Sant Joan de Vilatorrada", "Sant Julià de Vilatorta", "Sant Llorenç d'Hortons", "Sant Llorenç de la Muga", "Sant Martí de Centelles", "Sant Martí de Llèmena", "Sant Martí de Tous",
  "Sant Pau de Segúries", "Sant Pere de Ribes", "Sant Pere de Vilamajor", "Sant Pol de Mar", "Sant Quinti de Mediona", "Sant Quirze de Besora", "Sant Quirze del Vallès", "Sant Vicenç de Torello", "Santa Coloma de Farnérs", "Santa Cristina D'Aro",
  "Santa Eugènia de Berga", "Santa Eulalia de Ronçana", "Santa Margarida de Montbuí", "Santa María d'Oló", "Santa Maria de Besora", "Santa Maria de Palautordera", "Santa Oliva", "Santa Pau", "Santa Perpetua de Mogoda", "Santa Susanna",
  "Sarrià de Dalt", "Saus Camallera I Llampaies", "Sentmenat", "Sils", "Sitges", "Siurana", "Solsona", "Subirats", "Susqueda", "Súria",
  "Taradell", "Tarragona", "Teià", "Tordera", "Torredembarra", "Torrelavit", "Torrelles de Llobregat", "Torrent", "Torroella de Montgri", "Tossa de Mar",
  "Vall-llobrega", "Vallbona D'Anoia", "Vallgorguina", "Vallirana", "Vallromanes", "Valls", "Vandellòs i l'Hospitalet de L'Infant", "Vidreres", "Vidrà", "Vilablareix",
  "Viladrau", "Vilalba Sasserra", "Vilallonga de Ter", "Vilanova del Camí", "Vilanova del Vallès", "Vilaverd", "El Far d'Empordà", "Juncosa de Montmell", "El Morell", "El Palau d'Anglesola",
  "El Papiol", "El Pla del Penedès", "El Vendrell", "Els Pallaresos", "El Pla de Santa Maria", "La Cellera de Ter", "El Pont de Vilomara I Rocafort", "Sant Julià del Llor i Bonmatí", "Sant Salvador de Guardiola"
];

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://alphamap.netlify.app', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000); // Wait for scripts to load
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < towns.length; i++) {
    const town = towns[i];
    console.log(`[${i + 1}/${towns.length}] Processing: ${town}`);
    
    try {
      // Clear search
      const searchInput = await page.locator('#searchInput');
      await searchInput.clear();
      await searchInput.fill(town);
      
      // Wait for search results to appear
      await page.waitForTimeout(1500);
      
      // Try to click first search result - use safer selector
      try {
        const results = await page.locator('.search-result').all();
        if (results.length > 0) {
          await results[0].click();
          await page.waitForTimeout(800);
        } else {
          throw new Error('No search results found');
        }
      } catch (e) {
        console.log(`  ⚠️ Search result not found for: ${town}`);
        failCount++;
        continue;
      }
      
      // Uncheck any checked project checkboxes (make sure no projects selected)
      try {
        const projectCheckboxes = await page.locator('#projectTypesSection input[type="checkbox"]').all();
        for (const checkbox of projectCheckboxes) {
          if (await checkbox.isChecked()) {
            await checkbox.uncheck();
          }
        }
      } catch (e) {
        // Continue even if checkboxes not found
      }
      
      // Click Add button
      const addBtn = await page.locator('#addBtn');
      const isEnabled = await addBtn.isEnabled();
      if (!isEnabled) {
        console.log(`  ⚠️ Add button disabled for: ${town}`);
        failCount++;
        continue;
      }
      
      await addBtn.click();
      await page.waitForTimeout(2000); // Wait for Firebase save + display update
      
      console.log(`  ✅ Added: ${town}`);
      successCount++;
      
    } catch (error) {
      console.log(`  ❌ Failed: ${town} - ${error.message}`);
      failCount++;
    }
  }
  
  console.log(`\n📊 Summary: ✅ ${successCount} added, ❌ ${failCount} failed`);
  await browser.close();
})();
