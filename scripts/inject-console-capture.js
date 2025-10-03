const fs = require('fs');
const path = require('path');

const scriptContent = fs.readFileSync(
  path.join(__dirname, '..', 'public', 'dashboard-console-capture.js'),
  'utf-8'
);

const scriptTag = `<script>${scriptContent}</script>`;

// Find all HTML files in .next/server/app
function findHTMLFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findHTMLFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

const buildDir = path.join(__dirname, '..', '.next');
if (fs.existsSync(buildDir)) {
  const htmlFiles = findHTMLFiles(buildDir);
  
  htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    if (!content.includes('dashboard-console-capture.js')) {
      content = content.replace('</body>', `${scriptTag}</body>`);
      fs.writeFileSync(file, content);
      console.log(`Injected console capture into ${file}`);
    }
  });
  
  console.log(`Processed ${htmlFiles.length} HTML files`);
}