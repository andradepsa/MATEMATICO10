const express = require('express');
const { ExpressPeerServer } = require('peer');
const http = require('http');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Servir arquivos estáticos (seu index.html e outros)
app.use(express.static(__dirname));

// Rota de ping para manter o servidor ativo (opcional)
app.get('/ping', (req, res) => res.send('pong'));

// Configurar o PeerServer na rota /peerjs
const peerServer = ExpressPeerServer(server, {
  path: '/peerjs',
  proxied: true,
  debug: true
});
app.use('/peerjs', peerServer);

// Rota principal (opcional)
app.get('/', (req, res) => {
  res.send('Servidor K10 rodando! Acesse /peerjs para o PeerServer.');
});

// Iniciar o servidor
server.listen(port, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando na porta ${port}`);
  console.log(`🔗 PeerServer disponível em /peerjs`);
  console.log(`🔗 URL pública: ${process.env.RENDER_EXTERNAL_URL || 'localhost'}`);
});

// Auto-ping para evitar dormir (se desejar)
setInterval(() => {
  const url = process.env.RENDER_EXTERNAL_URL;
  if (url) {
    fetch(`${url}/ping`).catch(() => {});
  }
}, 10 * 60 * 1000);
