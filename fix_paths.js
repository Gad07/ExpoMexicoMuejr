const fs = require('fs');
const path = require('path');

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Match variations of imports like:
      // import ... from '../components/...'
      // import ... from '../../components/...'
      // import ... from '../../../components/...'
      const regexComponents = /from\s+['"](?:\.\.\/)+components\/(.*?)['"]/g;
      
      // We will replace them with '@/components/$1'
      if (regexComponents.test(content)) {
        content = content.replace(regexComponents, "from '@/components/$1'");
        changed = true;
      }
      
      // Check for dynamic imports or next/image srcs if they are hardcoded but imports are usually string literals
      const regexComponentsImport = /import\(['"](?:\.\.\/)+components\/(.*?)['"]\)/g;
      if (regexComponentsImport.test(content)) {
        content = content.replace(regexComponentsImport, "import('@/components/$1')");
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated paths in: ${fullPath}`);
      }
    }
  }
}

// Start processing from app directory
const targetDir = path.join(__dirname, 'app', '[locale]');
if (fs.existsSync(targetDir)) {
    processDirectory(targetDir);
    console.log('Path fix completed.');
} else {
    console.log('Directory not found:', targetDir);
}
