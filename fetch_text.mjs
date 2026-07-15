import https from 'https';
import * as cheerio from 'cheerio';

https.get('https://lugtur.com/32-estados-de-mexico/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const $ = cheerio.load(data);
    const descriptions = [];
    $('.elementor-image-box-content').each((i, el) => {
        const title = $(el).find('.elementor-image-box-title').text().trim();
        const desc = $(el).find('.elementor-image-box-description').text().trim();
        if (title) {
            descriptions.push(`${title}: ${desc || 'NO_DESC'}`);
        }
    });
    console.log(`Found ${descriptions.length} items in image boxes.`);
    console.log(descriptions.slice(0, 5));
  });
});
