const fs = require('fs');

async function translateText(text, targetLang) {
  if (typeof text !== 'string' || text.trim() === '') return '';
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(x => x[0]).join('');
  } catch (e) {
    console.error('Translation error for text:', text.substring(0, 20), e.message);
    return text;
  }
}

async function processTranslations() {
  const dbFile = 'data/translations.json';
  const db = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
  
  const tasks = [];
  
  function traverse(obj) {
    for (let k in obj) {
      if (obj[k] && typeof obj[k] === 'object') {
        if (obj[k].hasOwnProperty('es') && obj[k].hasOwnProperty('en') && obj[k].hasOwnProperty('fr')) {
          const esText = obj[k].es;
          if (typeof esText === 'string' && esText.trim() !== '') {
            if (!obj[k].en) {
              tasks.push(async () => {
                obj[k].en = await translateText(esText, 'en');
              });
            }
            if (!obj[k].fr) {
              tasks.push(async () => {
                obj[k].fr = await translateText(esText, 'fr');
              });
            }
          }
        } else {
          traverse(obj[k]);
        }
      }
    }
  }

  traverse(db);
  console.log(`Found ${tasks.length} translations needed.`);

  const batchSize = 20;
  for (let i = 0; i < tasks.length; i += batchSize) {
    console.log(`Processing batch ${i / batchSize + 1} / ${Math.ceil(tasks.length / batchSize)}`);
    const batch = tasks.slice(i, i + batchSize).map(f => f());
    await Promise.all(batch);
  }
  
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
  console.log('Done!');
}

processTranslations().catch(console.error);
