# 💬 Chat K10

> **Secure. Decentralized. Instant.**
> Real-time P2P communication — chat and file sharing directly in your browser, no installation required.

---

## 🚀 Getting Started

```
1. Open the app in your browser
2. Share your ID with a contact 🔐
3. Start chatting and sending files instantly 📁💬
```

> **No account. No download. No server needed.**

🔗 **Site oficial:** [andradepsa.github.io/MATEMATICO10/chat](https://andradepsa.github.io/MATEMATICO10/chat/index.html)

---

## 🔁 Communication Modes

### 🌐 General Mode — *The Infinite Web*

Fully decentralized P2P network. You send a message **once**, and the app automatically forwards it through your contacts, their contacts, and beyond — creating an organic web capable of reaching millions with zero extra effort.

| Feature | Details |
|---|---|
| Architecture | Browser-to-browser (no central server) |
| Capacity | **Unlimited** — grows stronger as more people join |
| Best for | Public broadcasts, events, campaigns, open communities |

> The more people join, the faster and stronger the network becomes.

---

### 🖥️ Server Mode — *The Meeting Room*

A central computer (the **Distributor**) acts as a hub. Everyone connects directly to it, and messages are instantly forwarded to all participants.

| Feature | Details |
|---|---|
| Architecture | Central hub (ServidorChatK10.html) |
| Capacity | Up to **200 simultaneous users** |
| Server ID format | Always ends with `-CENTRAL` (e.g. `AAAAAA-CENTRAL`) |
| Best for | Closed groups, meetings, live events |

> **How to start a server:** Open `ServidorChatK10.html` in your browser and keep the tab open.

#### 🐉 Hydra Mode (Auto-Scaling)

When the server approaches its limit (~150 connections), it automatically activates **Hydra Mode**:
- Sends migration instructions to all users
- Redirects new users to General Mode (Infinite Web)
- Prevents overload and keeps the server stable

---

## 📺 YouTube Live Chat Integration

Chat K10 can connect to any public YouTube Live video and display the official YouTube chat **side-by-side** with the K10 chat.

| Action | Requirement |
|---|---|
| View YouTube stream + chat | ✅ No account needed |
| Send messages in YouTube chat | ✅ Requires a signed-in YouTube/Google account |

> This is a standard YouTube rule that applies to the integrated chat feature.

---

## 🔐 Privacy & Encryption

| Mode | Privacy Level |
|---|---|
| Chat K10 ↔ Chat K10 | **Private** end-to-end communication |
| Chat K10 ↔ Server | **Group** communication |
| Server + Group E2EE enabled | Even the server owner **cannot read** your messages |

---

## 💡 Quick Tips

| Goal | Solution |
|---|---|
| Small, controlled group | Use **Server Mode** (open `ServidorChatK10.html`) |
| Reach thousands or millions | Use **General Mode** (Infinite Web) |
| Maximum privacy | Enable **Group Encryption (E2EE)** in Server Mode |

> The system automatically switches between modes when needed.

---

## ✨ Features

- ✅ Works directly in the browser — no installation
- ✅ Decentralized P2P network (General Mode)
- ✅ Centralized hub for organized groups (Server Mode)
- ✅ Auto-scaling via Hydra Mode
- ✅ End-to-end group encryption (E2EE)
- ✅ Secure file sharing 📁
- ✅ YouTube Live chat integration 📺
- ✅ Live radio, video broadcasting support (Server Mode)
- ✅ Zero accounts required to start

---

## 🗂️ Files

| File | Description |
|---|---|
| `ChatK10.html` | Main chat client — open in any browser |
| `ServidorChatK10.html` | Server/Distributor — opens a hub for group communication |

---

## 📡 How the Network Works

```
General Mode (Infinite Web):

 [You]
├──► Contact A1 ⇄ Contact B1
│     ├──► A2 ⇄ A3 ⇄ A4 ⇄ B2 ⇄ B3 ⇄ B4
│     │     ├──► A2.1 ⇄ A2.2 ⇄ A2.3 ⇄ (all other nodes)
│     │     │     └──► ∞ ⇄ everyone ⇄ ∞
│     │     ├──► A2.2 ⇄ (all ⇄ ∞)
│     │     └──► A2.3 ⇄ (all ⇄ ∞)
│     │
│     ├──► A3
│     │     ├──► A3.1 ⇄ everyone ⇄ ∞
│     │     ├──► A3.2 ⇄ everyone ⇄ ∞
│     │     └──► A3.3 ⇄ everyone ⇄ ∞
│     │
│     └──► A4
│           ├──► A4.1 ⇄ everyone ⇄ ∞
│           ├──► A4.2 ⇄ everyone ⇄ ∞
│           └──► A4.3 ⇄ everyone ⇄ ∞
│
└──► Contact B1 ⇄ Contact A1
      ├──► B2 ⇄ B3 ⇄ B4 ⇄ A2 ⇄ A3 ⇄ A4
      │     ├──► B2.1 ⇄ everyone ⇄ ∞
      │     ├──► B2.2 ⇄ everyone ⇄ ∞
      │     └──► B2.3 ⇄ everyone ⇄ ∞
      │
      ├──► B3
      │     ├──► B3.1 ⇄ everyone ⇄ ∞
      │     ├──► B3.2 ⇄ everyone ⇄ ∞
      │     └──► B3.3 ⇄ everyone ⇄ ∞
      │
      └──► B4
            ├──► B4.1 ⇄ everyone ⇄ ∞
            ├──► B4.2 ⇄ everyone ⇄ ∞
            └──► B4.3 ⇄ everyone ⇄ ∞

⇅ Infinite expansion ⇅

∞ ⇄ ∞ ⇄ ∞

Each node:
→ connects to parent ⇄ siblings ⇄ all nodes ⇄ ∞
→ expands without limit

⇒ Result: infinite, fully connected network (unbounded complete graph)

Server Mode (Meeting Room):

  [User 1] ──┐
  [User 2] ──┤──► [AAAAAA-CENTRAL] ──► broadcasts to all
  [User N] ──┘
```

---

<div align="center">

**Chat K10** — Open, fast, and private communication for everyone.

</div>
