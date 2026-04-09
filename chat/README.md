

```markdown
# 💬 Chat K10
> **Secure. Decentralized. Instant.**

Real-time P2P communication and file sharing directly in your browser — no installation required.

---

## 🚀 Getting Started

1. Open the app in your browser  
2. Share your Peer ID with friends  
3. Start chatting and sending files instantly  

> **No account. No download. No server required to start.**

🔗 **Official Site:** [andradepsa.github.io/MATEMATICO10/chat](https://andradepsa.github.io/MATEMATICO10/chat/index.html)

---

## 🔁 Communication Modes

### 🌐 General Mode — *The Infinite Web*

Fully decentralized P2P network. Messages travel directly between browsers.

| Feature       | Details                                      |
|---------------|----------------------------------------------|
| Architecture  | Browser-to-browser P2P mesh                  |
| Capacity      | **Unlimited**                                |
| Best for      | Public chats, large communities, broadcasts  |

### 🖥️ Server Mode — *The Meeting Room*

Users connect to a central hub that forwards messages.

| Feature          | Details                                           |
|------------------|---------------------------------------------------|
| Architecture     | Centralized relay hub                             |
| Capacity         | ~200 simultaneous users per server                |
| Server ID        | Ends with `-CENTRAL` (e.g. `K10-CENTRAL`)        |
| Best for         | Private groups, meetings, classes                 |

#### 🐉 Hydra Mode (Auto Scaling)
When a server reaches its limit, it automatically redirects new users to **General Mode**.

---

## 📡 Network & Users Topology

### Overall Architecture

Chat K10 uses a **hybrid model**:

- **Server Mode**: Fast centralized relay (limited capacity)  
- **General Mode**: Unlimited decentralized P2P mesh (Hydra)

```

```
                 CENTRAL SERVERS (All Equivalent)
            ┌──────────────────┬──────────────────┬──────────────────┐
            │ Server 1-CENTRAL ⇄ Server 2-CENTRAL ⇄ Server 3-CENTRAL ⇄ ...
            └──────────────────┴──────────────────┴──────────────────┘
                       ↔↔↔ Inter-server connections (knownServers) ↔↔↔

                                 │
            ┌────────────────────┼────────────────────┐
            │                    │                    │
     Direct Users       Sub-Server Trees        User Trees
            │                    │                    │
       [You] [You] ...     [You] → [U1] [U2]     [You] → [U1] [U2] ...
```

```

### When Server is Full → Hydra Mode Activates

```

```
            CENTRAL SERVERS (limited capacity)
                       │
                       ▼   (Automatic redirection)
```

====================================================================
GENERAL P2P WEB (HYDRA MODE)
============================

```
      [You] ─── [You] ─── [You] ─── [You] ─── [You]
       │        │         │         │         │
      [You] ─── [You] ─── [You] ─── [You] ─── [You]
       │        │         │         │         │
      [You] ─── [You] ─── [You] ─── [You] ─── [You]

           Direct Browser-to-Browser Connections
           + PEX (Peer Exchange) + Heartbeats
```

```

### How Users Connect

- In **Server Mode**: Users connect directly to one or more `-CENTRAL` servers.  
- In **General Mode**: Users form a **flat P2P mesh** — everyone can connect to many others directly.  
- Servers themselves can connect to each other (federated mesh).  
- There is **no single master central server** — all `-CENTRAL` servers are equal.  

**Key Reality**:  
The network is **hybrid and resilient**. It starts organized with servers and automatically expands into an unlimited decentralized web when needed.

---

## 📺 YouTube Live Chat Integration

Chat K10 can display any public YouTube Live stream with its official chat side-by-side.

| Action                        | Requirement                          |
|-------------------------------|--------------------------------------|
| Watch stream + chat           | No account needed                    |
| Send messages in YouTube chat | Requires signed-in YouTube account   |

---

## 🔐 Privacy & Encryption

| Mode                          | Privacy Level                              |
|-------------------------------|--------------------------------------------|
| General Mode (P2P)            | Direct browser-to-browser                  |
| Server Mode                   | Group communication via hub                |
| Server Mode + Group E2EE      | Server **cannot read** messages            |

---

## 💡 Quick Tips

| Goal                        | Recommended Mode                  |
|-----------------------------|-----------------------------------|
| Small / private group       | **Server Mode**                   |
| Large audience / public     | **General Mode** (Infinite Web)   |
| Maximum privacy in group    | Enable **Group E2EE**             |

---

## ✨ Main Features

- ✅ Works 100% in the browser — no installation  
- ✅ True decentralized P2P (General Mode)  
- ✅ Centralized fast relay (Server Mode)  
- ✅ Automatic Hydra scaling  
- ✅ Group end-to-end encryption (E2EE)  
- ✅ Secure file and audio sharing  
- ✅ YouTube Live + chat integration  
- ✅ Live radio and video broadcast support  
- ✅ Zero accounts required  

---

## 🗂️ Files

| File                    | Description                                      |
|-------------------------|--------------------------------------------------|
| `ChatK10.html`          | Main chat client (for all users)                 |
| `ServidorChatK10.html`  | Server / Distributor (hub for group chats)       |

---

<div align="center">
<strong>Chat K10</strong> — Open, fast, and private communication for everyone.
</div>
```


