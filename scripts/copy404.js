const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '..', 'build');
const indexFile = path.join(buildDir, 'index.html');
const fallbackFile = path.join(buildDir, '404.html');

if (!fs.existsSync(indexFile)) {
  console.error('index.html not found in build directory. Run the build first.');
  process.exit(1);
}

fs.copyFileSync(indexFile, fallbackFile);
console.log('Copied index.html to 404.html for SPA fallback');
