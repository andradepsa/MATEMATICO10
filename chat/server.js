const express = require('express');
const { ExpressPeerServer } = require('peer');
const http = require('http');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Servir arquivos estáticos (para a interface web, se quiser)
app.use(express.static(__dirname));

// Rota de ping para manter o Render acordado
app.get('/ping', (req, res) => res.send('pong'));

// Configurar o PeerServer (o verdadeiro motor do K10)
const peerServer = ExpressPeerServer(server, {
  path: '/peerjs',
  proxied: true,
  debug: true
});
app.use('/peerjs', peerServer);

// Opcional: rota para mostrar que o servidor está online
app.get('/', (req, res) => {
  res.send('Servidor K10 rodando! Acesse /peerjs para o PeerServer.');
});

// Iniciar o servidor
server.listen(port, '0.0.0.0', () => {
  console.log(`✅ Servidor K10 rodando na porta ${port}`);
  console.log(`🔗 PeerServer disponível em /peerjs`);
  console.log(`🔗 URL pública: ${process.env.RENDER_EXTERNAL_URL || 'localhost'}`);
});

// Auto-ping para evitar hibernação (mantém o serviço acordado)
setInterval(() => {
  const url = process.env.RENDER_EXTERNAL_URL;
  if (url) {
    fetch(`${url}/ping`).catch(() => {});
    console.log(`[AUTO-PING] ${new Date().toISOString()}`);
  }
}, 10 * 60 * 1000);
