const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDirs = [
  'Arte', 'Artesanias', 'Bienes_raices', 'Educacion', 
  'Energia', 'gatronomia', 'Moda', 'Salud_y_belleza', 
  'Tecnologia', 'Transporte', 'Turismo'
];

async function compressAll() {
  for (const dir of targetDirs) {
    const dirPath = path.join(__dirname, 'public/Galleria', dir);
    if (!fs.existsSync(dirPath)) continue;
    
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      if (!file.toLowerCase().endsWith('.jpg') && !file.toLowerCase().endsWith('.png')) continue;
      
      const filePath = path.join(dirPath, file);
      const tempPath = path.join(dirPath, 'temp_' + file);
      
      try {
        await sharp(filePath)
          .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(tempPath);
          
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        console.log('Compressed:', filePath);
      } catch (err) {
        console.error('Error compressing', filePath, err);
      }
    }
  }
}

compressAll().then(() => console.log('Done!'));
