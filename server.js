import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Parse redirects from _redirects if present
const redirectsFile = path.join(__dirname, '_redirects');
if (fs.existsSync(redirectsFile)) {
  const lines = fs.readFileSync(redirectsFile, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      const [fromPath, toPath, status] = parts;
      const statusCode = status ? parseInt(status, 10) : 301;
      app.get(fromPath, (req, res) => {
        res.redirect(statusCode, toPath);
      });
    }
  }
}

// Serve static assets from root directory
app.use(express.static(__dirname, {
  extensions: ['html', 'htm'],
  index: 'index.html'
}));

// Fallback to 404.html if a route is not found
app.use((req, res) => {
  const notFoundPath = path.join(__dirname, '404.html');
  if (fs.existsSync(notFoundPath)) {
    res.status(404).sendFile(notFoundPath);
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MATEMÁTICO 10 server running on http://0.0.0.0:${PORT}`);
});
