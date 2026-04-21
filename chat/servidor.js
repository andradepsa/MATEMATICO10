// servidor.js – K10-CENTRAL ultra‑leve (encaminhador)
(function() {
  if (window.__k10CentralLoaded) return;
  window.__k10CentralLoaded = true;

  const PEER_ID = 'K10-CENTRAL';
  const MAX_PEERS = 5000;
  const connections = new Map();
  let totalUsersHint = 0;

  function log(msg) {
    console.log(`[K10-CENTRAL] ${msg}`);
  }

  const peer = new Peer(PEER_ID, {
    host: '0.peerjs.com',
    port: 443,
    secure: true,
    debug: 0
  });

  peer.on('open', () => log('✅ Servidor Grupo 0 online'));

  peer.on('connection', (conn) => {
    const peerId = conn.peer;
    if (connections.size >= MAX_PEERS) {
      log(`❌ Limite atingido, recusando ${peerId}`);
      conn.close();
      return;
    }

    connections.set(peerId, { conn, lastSeen: Date.now() });
    log(`🔗 Conectado: ${peerId} (${connections.size})`);

    conn.on('open', () => {
      try {
        conn.send({
          type: 'group0-welcome',
          totalUsers: totalUsersHint + connections.size,
          servers: [] // lista vazia – cliente usará fallback
        });
        log(`📤 Welcome enviado para ${peerId}`);
      } catch(e) {}
    });

    conn.on('data', (data) => {
      const entry = connections.get(peerId);
      if (entry) entry.lastSeen = Date.now();
      if (data && data.type === 'group0-request') {
        try {
          conn.send({
            type: 'group0-welcome',
            totalUsers: totalUsersHint + connections.size,
            servers: []
          });
        } catch(e) {}
      }
    });

    conn.on('close', () => {
      connections.delete(peerId);
      log(`🔌 Desconectado: ${peerId} (${connections.size})`);
    });
  });

  // Atualiza estimativa a cada 10s
  setInterval(() => {
    totalUsersHint = connections.size;
  }, 10000);
})();
