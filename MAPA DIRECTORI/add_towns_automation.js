const { chromium } = require('playwright');

const towns = [
  "Vilobí d'Onyar", "Aiguafreda", "Aiguaviva", "Albinyana", "Alforja",
  "Altafulla", "Amer", "Anglès", "Arbúcies", "Arenys de Mar",
  "Esparreguera", "Igualada", "Olot", "Olèrdola", "Balenya",
  "Banyeres del Penedès", "Banyoles", "Begues", "Bellver de Cerdanya", "Berga",
  "Bescanó", "Bigues i Riells", "Blanes", "Breda", "Cabrera d'Anoia",
  "Cadaqués", "Calella", "Calldetenes", "Callus", "Camarles",
  "Cambrils", "Campelles", "Campllong", "Camprodon", "Camós",
  "Canet d'Adri", "Canovelles", "Canyelles", "Capellades", "Cardedeu",
  "Cardona", "Castell-Platja D'Aro", "Castellar del Vallés", "Castellbisbal", "Castellcir",
  "Castellgali", "Castellnou de Bages", "Castelloli", "Castellvell del Camp", "Castellvi de la Marca",
  "Castelló D'Empuries", "Centelles", "Cervera", "Collsuspina", "Corbera de Llobregat",
  "Cornella de Llobregat", "Creixell", "Cunit", "Canoves", "El Bruc",
  "Montmany- Figaro", "Flaçà", "Folgueroles", "Fornells de la Selva", "Fortià",
  "Girona", "Gualba", "Jorba", "L'Ampolla", "Escala, L'",
  "L'Esquirol", "La Bisbal d'Empordà", "La Garriga", "La Granada", "La Pera",
  "La Pobla de Claramunt", "La Riba", "Les Cabanyes", "Les Masies de Roda", "Planes d'Hostoles",
  "Linyola", "Lleida", "Llinars del Valles", "Lliça D'Amunt", "Maià de Montcal",
  "Malgrat de Mar", "Manlleu", "Manresa", "Martorell", "Martorelles",
  "Masquefa", "Massanes", "Matadepera", "Mataro", "Maçanet de la Selva",
  "Molins de Rei", "Molló", "Mont-ras", "Mont-roig del Camp", "Montblanc",
  "Montesquiu", "Montgat", "Montmelo", "Navarcles", "Navata",
  "Palafolls", "Palafrugell", "Palamós", "Palau-Solità i Plegamans", "Pallejà",
  "Palol de Revardit", "Pals", "Parets del Vallès", "Piera", "Pineda de Mar",
  "Prats de Lluçanès", "Ribes de Freser", "Riells I Viabrea", "Riudarenes", "Roda de Berà",
  "Sallent", "Sant Andreu de la Barca", "Sant Aniol de Finestres", "San Celoni", "Sant Cugat del Vallès",
  "Sant Cugat Sesgarrigues", "Sant Feliu de Codines", "Sant Feliu de Guixols", "Sant Feliu de Pallerols", "Sant Fruitos de Bages",
  "Sant Gregori", "Sant Hilari Sacalm", "Sant Jaume dels Domenys", "Sant Joan de Vilatorrada", "Sant Julià de Vilatorta",
  "Sant Llorenç d'Hortons", "Sant Llorenç de la Muga", "Sant Martí de Centelles", "Sant Martí de Llèmena", "Sant Martí de Tous",
  "Sant Pau de Segúries", "Sant Pere de Ribes", "Sant Pere de Vilamajor", "Sant Pol de Mar", "Sant Quinti de Mediona",
  "Sant Quirze de Besora", "Sant Quirze del Vallès", "Sant Vicenç de Torello", "Santa Coloma de Farnérs", "Santa Cristina D'Aro",
  "Santa Eugènia de Berga", "Santa Eulalia de Ronçana", "Santa Margarida de Montbuí", "Santa María d'Oló", "Santa Maria de Besora",
  "Santa Maria de Palautordera", "Santa Oliva", "Santa Pau", "Santa Perpetua de Mogoda", "Santa Susanna",
  "Sarrià de Dalt", "Saus Camallera I Llampaies", "Sentmenat", "Sils", "Sitges",
  "Siurana", "Solsona", "Subirats", "Susqueda", "Súria",
  "Taradell", "Tarragona", "Teià", "Tordera", "Torredembarra",
  "Torrelavit", "Torrelles de Llobregat", "Torrent", "Torroella de Montgri", "Tossa de Mar",
  "Vall-llobrega", "Vallbona D'Anoia", "Vallgorguina", "Vallirana", "Vallromanes",
  "Valls", "Vandellòs i l'Hospitalet de L'Infant", "Vidreres", "Vidrà", "Vilablareix",
  "Viladrau", "Vilalba Sasserra", "Vilallonga de Ter", "Vilanova del Camí", "Vilanova del Vallès",
  "Vilaverd", "El Far d'Empordà", "Juncosa de Montmell", "El Morell", "El Palau d'Anglesola",
  "El Papiol", "El Pla del Penedès", "El Vendrell", "Els Pallaresos", "El Pla de Santa Maria",
  "La Cellera de Ter", "El Pont de Vilomara I Rocafort", "Sant Julià del Llor i Bonmatí", "Sant Salvador de Guardiola"
];

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  let added = 0;
  let failed = 0;
  
  console.log(`🚀 Starting automation...`);
  await page.goto('https://alphamap.netlify.app', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  
  for (let i = 0; i < towns.length; i++) {
    const town = towns[i];
    console.log(`[${i+1}/${towns.length}] Processing: ${town}...`);
    
    try {
      // Get client count BEFORE adding
      const clientCountBefore = await page.evaluate(() => {
        return window.clients ? window.clients.length : 0;
      });
      
      // Clear search
      const searchInput = await page.$('#searchInput');
      await searchInput.fill(town);
      
      // Wait for search results
      await page.waitForSelector('.search-result', { timeout: 5000 });
      
      // Click first result
      await page.click('.search-result:first-child');
      
      // Wait for result to be selected
      await page.waitForTimeout(1000);
      
      // Make sure NO projects are checked
      const alprCheck = await page.$('#alprCheck');
      const cctvCheck = await page.$('#cctvCheck');
      const cmeCheck = await page.$('#cmeCheck');
      const residuosCheck = await page.$('#residuosCheck');
      
      if (alprCheck) await alprCheck.uncheck().catch(() => {});
      if (cctvCheck) await cctvCheck.uncheck().catch(() => {});
      if (cmeCheck) await cmeCheck.uncheck().catch(() => {});
      if (residuosCheck) await residuosCheck.uncheck().catch(() => {});
      
      // Click Add button
      const addBtn = await page.$('#addBtn');
      if (addBtn && !(await addBtn.isDisabled())) {
        await addBtn.click();
        
        // WAIT FOR CLIENT COUNT TO INCREASE (verify actual save)
        await page.waitForTimeout(300);  // Let autoSaveToFirebase() start
        let saveVerified = false;
        for (let attempt = 0; attempt < 30; attempt++) {  // Try up to 30 times (15 seconds total)
          await page.waitForTimeout(500);
          const clientCountAfter = await page.evaluate(() => {
            return window.clients ? window.clients.length : 0;
          });
          if (clientCountAfter > clientCountBefore) {
            saveVerified = true;
            console.log(`  ✅ Saved & verified (${clientCountBefore} → ${clientCountAfter} clients)`);
            added++;
            // Extra wait for Firebase async save to complete
            await page.waitForTimeout(2000);
            break;
          }
        }
        
        if (!saveVerified) {
          console.log(`  ❌ Save verification failed (client count didn't increase)`);
          failed++;
        }
      } else {
        console.log(`  ⚠️ Add button disabled or not found`);
        failed++;
      }
      
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
      failed++;
    }
    
    // Clear for next iteration
    const searchInput = await page.$('#searchInput');
    await searchInput.fill('');
    
    // SLOWER RATE: 7 second delay between towns (to avoid Firebase quota)
    await page.waitForTimeout(7000);
  }
  
  console.log(`\n✅ Automation complete!`);
  console.log(`Added: ${added}, Failed: ${failed}`);
  console.log(`Browser will close in 10 seconds...`);
  
  await page.waitForTimeout(10000);
  await browser.close();
})();
