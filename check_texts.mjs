import https from 'https';
import * as cheerio from 'cheerio';

https.get('https://lugtur.com/32-estados-de-mexico/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const $ = cheerio.load(data);
    const descriptions = [];
    $('.elementor-image-box-wrapper').each((i, el) => {
        const title = $(el).find('.elementor-image-box-title').text().trim();
        const desc = $(el).find('.elementor-image-box-description').text().trim();
        if (title && desc) {
            descriptions.push(`${title}: ${desc}`);
        }
    });
    console.log(`Found ${descriptions.length} descriptions.`);
    if (descriptions.length > 0) {
        console.log("Sample 1:", descriptions[0]);
        console.log("Sample 2:", descriptions[1]);
    }
  });
});
