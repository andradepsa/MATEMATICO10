const express = require('express');
const { ExpressPeerServer } = require('peer');
const http = require('http');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Servir arquivos estáticos
app.use(express.static(__dirname));

// Rota de ping (opcional)
app.get('/ping', (req, res) => res.send('pong'));

// Criar o PeerServer
const peerServer = ExpressPeerServer(server, {
  path: '/',
  proxied: true,
  debug: true
});

// Montar o PeerServer na raiz /peerjs
app.use('/peerjs', peerServer);

// Rota principal
app.get('/', (req, res) => {
  res.send('Servidor K10 rodando! Acesse /peerjs para o PeerServer.');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`PeerServer disponível em /peerjs`);
});

// Auto-ping (opcional)
setInterval(() => {
  const url = process.env.RENDER_EXTERNAL_URL;
  if (url) fetch(`${url}/ping`).catch(() => {});
}, 10 * 60 * 1000);
