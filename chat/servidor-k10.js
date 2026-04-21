// servidor-k10.js - K10-CENTRAL com deduplicação e relay
(function() {
  if (window.__k10CentralLoaded) return;
  window.__k10CentralLoaded = true;

  console.log('[K10] Iniciando servidor central...');

  const PEER_ID = 'K10-CENTRAL';
  const MAX_PEERS = 5000;
  const connections = new Map();
  const GROUP_ID = 'AAAA';
  const seenMessages = new Map(); // msgId -> expiry

  function isDuplicate(msgId) {
    if (!msgId) return false;
    const now = Date.now();
    for (let [id, exp] of seenMessages.entries()) if (exp < now) seenMessages.delete(id);
    if (seenMessages.has(msgId)) return true;
    seenMessages.set(msgId, now + 60000);
    return false;
  }

  const peer = new Peer(PEER_ID, {
    host: '0.peerjs.com',
    port: 443,
    secure: true,
    debug: 0
  });

  peer.on('open', () => console.log('✅ K10-CENTRAL online (grupo fixo ' + GROUP_ID + ')'));
  peer.on('error', (err) => {
    if (err.type === 'unavailable-id') console.warn('⚠️ ID já em uso – outro servidor ativo');
    else console.error(err);
  });

  function relayMessage(conn, data, senderId) {
    if (!data || data.type !== 'message') return;
    if (data.direct === true) return;
    if (data._relayed) return;
    if (isDuplicate(data.id)) return;
    data._relayed = true;
    let count = 0;
    for (const [pid, target] of connections.entries()) {
      if (pid === senderId) continue;
      if (target.conn?.open) try { target.conn.send(data); count++; } catch(e) {}
    }
    if (count) console.log(`🔄 Relay ${data.id} -> ${count} peers`);
  }

  function sendPeerList(conn) {
    const peerIds = Array.from(connections.keys()).filter(id => id !== conn.peer);
    if (peerIds.length === 0) return;
    try {
      conn.send({ type: 'peer-list', peers: peerIds, groupId: GROUP_ID });
      console.log(`📋 Peer-list (${peerIds.length}) enviada para ${conn.peer}`);
    } catch(e) {}
  }

  peer.on('connection', (conn) => {
    if (connections.size >= MAX_PEERS) { conn.close(); return; }
    const peerId = conn.peer;
    connections.set(peerId, { conn, lastSeen: Date.now() });
    console.log(`🔗 Conectado: ${peerId} (total: ${connections.size})`);

    conn.on('open', () => {
      try { conn.send({ type: 'group0-welcome', totalUsers: 0, servers: [] }); } catch(e) {}
      setTimeout(() => sendPeerList(conn), 500);
    });

    conn.on('data', (data) => {
      const entry = connections.get(peerId);
      if (entry) entry.lastSeen = Date.now();
      if (data?.type === 'group0-request') {
        try { conn.send({ type: 'group0-welcome', totalUsers: 0, servers: [] }); } catch(e) {}
        return;
      }
      relayMessage(conn, data, peerId);
    });

    conn.on('close', () => {
      connections.delete(peerId);
      console.log(`🔌 Desconectado: ${peerId} (restam: ${connections.size})`);
      const leaveMsg = { type: 'pex-update', gid: GROUP_ID, user: peerId, ttl: 5 };
      for (const [pid, target] of connections.entries()) {
        if (target.conn?.open) try { target.conn.send(leaveMsg); } catch(e) {}
      }
    });
  });

  // Manutenção
  setInterval(() => {
    const now = Date.now();
    for (const [pid, data] of connections.entries()) {
      if (now - data.lastSeen > 90000) {
        console.log(`🧹 Removendo inativo: ${pid}`);
        try { data.conn.close(); } catch(e) {}
        connections.delete(pid);
      }
    }
  }, 60000);

  setInterval(() => {
    const peerIds = Array.from(connections.keys());
    if (peerIds.length === 0) return;
    for (const [pid, target] of connections.entries()) {
      if (target.conn?.open) {
        try {
          target.conn.send({
            type: 'pex',
            peers: peerIds.filter(id => id !== pid),
            groupId: GROUP_ID,
            groupSize: connections.size
          });
        } catch(e) {}
      }
    }
  }, 30000);
})();
