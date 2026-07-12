const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8080;
// Go up one level from 'scripts/' to the project root
const ROOT_DIR = path.join(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.md': 'text/markdown',
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  
  // API endpoint for saving markdown files
  if (req.method === 'POST' && parsedUrl.pathname === '/api/save') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { oldFilePath, newFilePath, content } = JSON.parse(body);
        
        // Remove leading "../" or "./" because the client sends paths like "../todo.md"
        const cleanOldPath = (oldFilePath || '').replace(/^(\.\.\/)+/, '').replace(/^(\.\/)+/, '');
        const cleanNewPath = (newFilePath || cleanOldPath).replace(/^(\.\.\/)+/, '').replace(/^(\.\/)+/, '');
        
        const absoluteOldPath = path.resolve(ROOT_DIR, cleanOldPath);
        const absoluteNewPath = path.resolve(ROOT_DIR, cleanNewPath);
        
        // Security check to prevent escaping the ROOT_DIR
        if (!absoluteNewPath.startsWith(ROOT_DIR) || (cleanOldPath && !absoluteOldPath.startsWith(ROOT_DIR))) {
          res.writeHead(403);
          res.end(JSON.stringify({ error: 'Access denied (Path outside root)' }));
          return;
        }

        // Handle rename if path changed
        if (cleanOldPath && cleanOldPath !== cleanNewPath && fs.existsSync(absoluteOldPath)) {
          fs.renameSync(absoluteOldPath, absoluteNewPath);
          console.log(`[RENAMED] ${cleanOldPath} -> ${cleanNewPath}`);
        }

        fs.writeFileSync(absoluteNewPath, content, 'utf8');
        console.log(`[SAVED] ${cleanNewPath}`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        console.error(`[ERROR] Save failed:`, err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API endpoint for creating a file or folder
  if (req.method === 'POST' && parsedUrl.pathname === '/api/create') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const { path: newPath, isFolder } = JSON.parse(body);
        const cleanPath = (newPath || '').replace(/^(\.\.\/)+/, '').replace(/^(\.\/)+/, '');
        const absolutePath = path.resolve(ROOT_DIR, cleanPath);
        
        if (!absolutePath.startsWith(ROOT_DIR)) {
          res.writeHead(403);
          res.end(JSON.stringify({ error: 'Access denied' }));
          return;
        }
        
        if (fs.existsSync(absolutePath)) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Already exists' }));
          return;
        }

        if (isFolder) {
          fs.mkdirSync(absolutePath, { recursive: true });
          console.log(`[CREATED FOLDER] ${cleanPath}`);
        } else {
          fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
          fs.writeFileSync(absolutePath, '', 'utf8');
          console.log(`[CREATED FILE] ${cleanPath}`);
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API endpoint for deleting a file or folder
  if (req.method === 'POST' && parsedUrl.pathname === '/api/delete') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const { path: targetPath } = JSON.parse(body);
        const cleanPath = (targetPath || '').replace(/^(\.\.\/)+/, '').replace(/^(\.\/)+/, '');
        const absolutePath = path.resolve(ROOT_DIR, cleanPath);
        
        if (!absolutePath.startsWith(ROOT_DIR) || absolutePath === ROOT_DIR) {
          res.writeHead(403);
          res.end(JSON.stringify({ error: 'Access denied' }));
          return;
        }

        if (fs.existsSync(absolutePath)) {
          const stat = fs.statSync(absolutePath);
          if (stat.isDirectory()) {
            fs.rmSync(absolutePath, { recursive: true, force: true });
            console.log(`[DELETED FOLDER] ${cleanPath}`);
          } else {
            fs.unlinkSync(absolutePath);
            console.log(`[DELETED FILE] ${cleanPath}`);
          }
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API endpoint for reading a file
  if (req.method === 'GET' && parsedUrl.pathname === '/api/read') {
    const targetPath = parsedUrl.query.path;
    const cleanPath = (targetPath || '').replace(/^(\.\.\/)+/, '').replace(/^(\.\/)+/, '');
    const absolutePath = path.resolve(ROOT_DIR, cleanPath);
    
    if (!absolutePath.startsWith(ROOT_DIR) || !fs.existsSync(absolutePath)) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }
    
    try {
      const content = fs.readFileSync(absolutePath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(content);
    } catch(e) {
      res.writeHead(500);
      res.end('Error reading file');
    }
    return;
  }

  // API endpoint for fetching the markdown file tree dynamically
  if (req.method === 'GET' && parsedUrl.pathname === '/api/tree') {
    function buildTree(dir, name = "Root Workspace") {
      const node = {
        name: name,
        type: "folder",
        expanded: name === "Root Workspace",
        children: []
      };
      
      let files = [];
      try { files = fs.readdirSync(dir); } catch(e) {}
      
      // Sort: folders first, then files alphabetically
      files.sort((a, b) => {
        try {
          const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
          const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
          if (aIsDir && !bIsDir) return -1;
          if (!aIsDir && bIsDir) return 1;
          return a.localeCompare(b);
        } catch(e) { return 0; }
      });
      
      for (const file of files) {
        if (['node_modules', '.git', 'graphify-out', 'dashboard'].includes(file)) continue; // ignore dashboard to hide internal files
        if (file.startsWith('.')) continue; // hide hidden files/folders
        
        const fullPath = path.join(dir, file);
        try {
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            const childTree = buildTree(fullPath, file);
            if (childTree.children.length > 0) {
              node.children.push(childTree);
            }
          } else if (file.endsWith('.md')) {
            const relPath = path.relative(ROOT_DIR, fullPath);
            node.children.push({
              name: file,
              type: "file",
              path: "../" + relPath.replace(/\\/g, '/'),
              label: file.replace('.md', '')
            });
          }
        } catch(e) {}
      }
      return node;
    }

    try {
      const tree = buildTree(ROOT_DIR);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tree));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Serve static files
  let pathname = parsedUrl.pathname;
  if (pathname === '/' || pathname === '/dashboard/') {
    pathname = '/dashboard/index.html';
  }

  const ext = path.extname(pathname);
  const filePath = path.join(ROOT_DIR, pathname);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'text/plain' });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 DJP Live Editable Dashboard Server`);
  console.log(`-------------------------------------`);
  console.log(`👉 Open your browser here: http://localhost:${PORT}/dashboard/index.html`);
  console.log(`Press Ctrl+C to stop.\n`);
});
