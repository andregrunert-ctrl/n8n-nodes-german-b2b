const fs = require('fs');
const path = require('path');

function copyRecursive(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else if (entry.isFile() && (entry.name.endsWith('.svg') || entry.name.endsWith('.png') || entry.name.endsWith('.json'))) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied asset: ${entry.name} -> ${destPath}`);
    }
  }
}

if (fs.existsSync('nodes')) {
  copyRecursive('nodes', path.join('dist', 'nodes'));
}
if (fs.existsSync('credentials')) {
  copyRecursive('credentials', path.join('dist', 'credentials'));
}
console.log('Assets build completed.');
