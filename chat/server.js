const express = require('express');
const { ExpressPeerServer } = require('peer');
const http = require('http');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Servir arquivos estáticos (seu index.html)
app.use(express.static(__dirname));

// Rota de ping (opcional, para monitoramento)
app.get('/ping', (req, res) => res.send('pong'));

// Criação e montagem do PeerServer
// NOTA: A opção 'path' aqui define como o PeerServer vai responder INTERNAMENTE.
// O caminho final, '/peerjs', é definido no 'app.use' abaixo.
const peerServer = ExpressPeerServer(server, {
  path: '/', // Ou qualquer outro caminho, desde que não conflite com o '/peerjs'
  proxied: true,
  debug: true
});
// Monta o PeerServer para responder a todas as requisições que começam com '/peerjs'
app.use('/peerjs', peerServer);

// Rota principal
app.get('/', (req, res) => {
  res.send('Servidor K10 rodando! Acesse /peerjs para o PeerServer.');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`PeerServer disponível em /peerjs`);
});

// Auto-ping para manter o serviço ativo (opcional)
setInterval(() => {
  const url = process.env.RENDER_EXTERNAL_URL;
  if (url) fetch(`${url}/ping`).catch(() => {});
}, 10 * 60 * 1000);
