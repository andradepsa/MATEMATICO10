"""
Chat K10 — Servidor Integrado
Roda: python Chat_K10.py
Abre automaticamente no browser em http://localhost:8765
"""

import re, json, os, sys, webbrowser, threading
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import requests

PORT = 8765
HTML_FILE = "Chat_Desktop.HTML"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 Chrome/124.0 Safari/537.36",
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8",
}

# ── Resolve @handle/live → videoId ─────────────────────────────
def resolve_live(handle: str):
    url = f"https://www.youtube.com/@{handle}/live"
    try:
        r = requests.get(url, headers=HEADERS, allow_redirects=True, timeout=10)

        # 1. URL final após redirect
        m = re.search(r"[?&]v=([A-Za-z0-9_-]{11})", r.url)
        if not m:
            m = re.search(r'"videoId":"([A-Za-z0-9_-]{11})"', r.text)
        if not m:
            m = re.search(r'canonical[^>]+[?&]v=([A-Za-z0-9_-]{11})', r.text)

        if m:
            vid = m.group(1)
            return {
                "live":     True,
                "videoId":  vid,
                "handle":   handle,
                "chatUrl":  f"https://www.youtube.com/live_chat?is_popout=1&v={vid}",
                "watchUrl": f"https://www.youtube.com/watch?v={vid}",
            }
    except Exception as e:
        print(f"  [ERRO] @{handle}: {e}")
    return {"live": False, "handle": handle}


# ── Handler HTTP ────────────────────────────────────────────────
class K10Handler(SimpleHTTPRequestHandler):

    def log_message(self, fmt, *args):
        pass  # silencia log padrão

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")

    def _json(self, code, data):
        body = json.dumps(data, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", len(body))
        self._cors()
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        params = parse_qs(parsed.query)

        # ── API: /live?handle=vtv24 ─────────────────────────────
        if parsed.path == "/live":
            handle = params.get("handle", [""])[0].strip().lstrip("@")
            if not handle:
                self._json(400, {"error": "handle obrigatório"})
                return
            print(f"  📡 Resolvendo @{handle}...", end=" ", flush=True)
            result = resolve_live(handle)
            if result["live"]:
                print(f"✅ {result['videoId']}")
            else:
                print("⬜ sem live")
            self._json(200 if result["live"] else 404, result)
            return

        # ── API: /ping ──────────────────────────────────────────
        if parsed.path == "/ping":
            self._json(200, {"status": "ok"})
            return

        # ── Serve o Chat_Desktop.HTML ───────────────────────────
        if parsed.path in ("/", f"/{HTML_FILE}"):
            self.path = f"/{HTML_FILE}"
        super().do_GET()


# ── Main ────────────────────────────────────────────────────────
if __name__ == "__main__":
    if not os.path.exists(HTML_FILE):
        print(f"\n❌ Arquivo '{HTML_FILE}' não encontrado!")
        print(f"   Coloque o Chat_Desktop.HTML na mesma pasta que este script.\n")
        sys.exit(1)

    server = HTTPServer(("localhost", PORT), K10Handler)

    url = f"http://localhost:{PORT}"
    print(f"""
╔══════════════════════════════════════════════╗
║           Chat K10 — Servidor Ativo          ║
╠══════════════════════════════════════════════╣
║  Endereço : {url:<34}║
║  YouTube  : /live?handle=CANAL  (automático) ║
║  Pare com : Ctrl+C                           ║
╚══════════════════════════════════════════════╝
""")

    # Abre o browser automaticamente após 1s
    threading.Timer(1.0, lambda: webbrowser.open(url)).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n🔴 Chat K10 encerrado.")
