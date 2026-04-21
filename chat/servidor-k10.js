// servidor-k10.js
// Servidor K10-CENTRAL ultra-leve – apenas Grupo 0 (encaminhador)

(function() {
  // Evita múltiplas inicializações
  if (window.__k10CentralLoaded) return;
  window.__k10CentralLoaded = true;

  const PEER_ID = 'K10-CENTRAL';
  const MAX_PEERS = 5000;
  const connections = new Map(); // peerId -> { conn, lastSeen }

  // Limpeza de conexões mortas a cada 30s
  setInterval(() => {
    const now = Date.now();
    for (const [pid, data] of connections.entries()) {
      const conn = data.conn;
      const isClosed = !conn || conn.close || (conn.peerConnection && conn.peerConnection.connectionState === 'closed');
      if (isClosed || (now - data.lastSeen) > 90000) {
        try { conn && conn.close(); } catch(e) {}
        connections.delete(pid);
      }
    }
    if (window.__k10UpdateCount) window.__k10UpdateCount(connections.size);
  }, 30000);

  // Inicializa PeerJS
  const peer = new Peer(PEER_ID, {
    host: '0.peerjs.com',
    port: 443,
    secure: true,
    debug: 0
  });

  peer.on('open', () => {
    console.log('[K10-CENTRAL] Servidor Grupo 0 online');
    if (window.__k10StatusCb) window.__k10StatusCb('online');
  });

  peer.on('connection', (conn) => {
    const peerId = conn.peer;
    if (connections.size >= MAX_PEERS) {
      try { conn.close(); } catch(e) {}
      return;
    }

    connections.set(peerId, { conn, lastSeen: Date.now() });
    if (window.__k10UpdateCount) window.__k10UpdateCount(connections.size);

    conn.on('open', () => {
      try {
        // Envia o welcome com totalUsers estimado
        conn.send({
          type: 'group0-welcome',
          totalUsers: connections.size,
          servers: []  // cliente usará fallback para se conectar ao próprio servidor (funciona)
        });
      } catch(e) {}
    });

    conn.on('data', (data) => {
      const entry = connections.get(peerId);
      if (entry) entry.lastSeen = Date.now();
      // Responde novamente se receber group0-request
      if (data && data.type === 'group0-request') {
        try {
          conn.send({
            type: 'group0-welcome',
            totalUsers: connections.size,
            servers: []
          });
        } catch(e) {}
      }
      // Não faz relay de mais nada
    });

    conn.on('close', () => {
      connections.delete(peerId);
      if (window.__k10UpdateCount) window.__k10UpdateCount(connections.size);
    });
  });

  peer.on('error', (err) => {
    if (err.type === 'unavailable-id') {
      console.error('[K10-CENTRAL] ID já em uso! Outro servidor está rodando?');
      if (window.__k10StatusCb) window.__k10StatusCb('erro: id em uso');
    }
  });

  // Expõe contadores para possível UI (opcional)
  window.__k10Central = { getCount: () => connections.size };
})();
