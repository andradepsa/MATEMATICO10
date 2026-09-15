#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
════════════════════════════════════════════════════════════════════════
 BUSCADOR DE VÍDEOS DO YOUTUBE — SEM API (MATEMÁTICO 10)
════════════════════════════════════════════════════════════════════════
 Busca links de novas videoaulas no YouTube SEM precisar de API key,
 verifica cada vídeo via oEmbed (remove mortos/privados) e imprime JSON
 pronto para colar em `projetos/B/topicos.js` (CURADOS).

 Como funciona (método público, sem chave):
   1. Baixa a página de resultados https://www.youtube.com/results?...
   2. Extrai "videoRenderer" do ytInitialData (id, título, duração)
   3. Confirma cada id no oEmbed oficial (HTTP 200 = vivo)

 Uso:
   python tools/buscar_videos.py "progressão aritmética"           # 1 termo
   python tools/buscar_videos.py "progressão aritmética" --n 5     # 5 resultados
   python tools/buscar_videos.py "ph e pOH" --json                 # só o JSON

 Requisitos: Python 3.8+ (biblioteca padrão apenas — sem pip install).
 Nota: respeite os Termos do YouTube; uso para curadoria de links
 públicos com atribuição (o título vem do próprio oEmbed oficial).
════════════════════════════════════════════════════════════════════════
"""
import argparse
import json
import re
import sys
import urllib.parse
import urllib.request

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")


def _get(url: str, timeout: int = 15) -> str:
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
    })
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", "replace")


def buscar_youtube(query: str, n: int):
    """Extrai videoId/título/duração da página pública de resultados."""
    url = "https://www.youtube.com/results?search_query=" + urllib.parse.quote(query)
    html = _get(url)
    out, vistos = [], set()
    padrao = re.compile(
        r'"videoRenderer":\{"videoId":"([\w-]{6,})".*?'
        r'"title":\{"runs":\[\{"text":"((?:[^"\\]|\\.)*)"')
    for m in padrao.finditer(html):
        vid, titulo = m.group(1), m.group(2)
        if vid in vistos:
            continue
        vistos.add(vid)
        titulo = (titulo.replace("\\u0026", "&").replace('\\"', '"').replace("\\/", "/"))
        seg = html[m.start():m.start() + 4000]
        dm = re.search(r'"lengthText":\{[^}]*"simpleText":"(\d+:\d+(?::\d+)?)"', seg)
        out.append({"id": vid, "title": titulo, "dur": dm.group(1) if dm else ""})
        if len(out) >= n:
            break
    return out


def oembed_vivo(vid: str) -> bool:
    """HTTP 200 no oEmbed oficial = vídeo público e reproduzível."""
    u = ("https://www.youtube.com/oembed?url=" +
         urllib.parse.quote("https://www.youtube.com/watch?v=" + vid, safe="") +
         "&format=json")
    try:
        _get(u, timeout=12)
        return True
    except Exception:
        return False


def main():
    ap = argparse.ArgumentParser(description="Busca vídeos do YouTube sem API (com verificação oEmbed).")
    ap.add_argument("consulta", help="termo de busca (ex.: 'progressão aritmética')")
    ap.add_argument("--n", type=int, default=3, help="quantos vídeos (padrão 3)")
    ap.add_argument("--json", action="store_true", help="imprime só o JSON pronto para o CURADOS")
    args = ap.parse_args()

    if not args.json:
        print(f"🔍 Buscando (sem API): {args.consulta!r} …", file=sys.stderr)
    achados = buscar_youtube(args.consulta, args.n + 2)  # margem p/ mortos
    if not args.json:
        print(f"   {len(achados)} candidatos — verificando via oEmbed…", file=sys.stderr)
    vivos = []
    for v in achados:
        if oembed_vivo(v["id"]):
            vivos.append({"id": v["id"], "title": v["title"], "dur": v["dur"]})
        if len(vivos) >= args.n:
            break
    if args.json:
        print(json.dumps(vivos, ensure_ascii=False, indent=2))
    else:
        if not vivos:
            print("❌ Nenhum vídeo vivo encontrado.", file=sys.stderr)
            sys.exit(1)
        for v in vivos:
            print(f'  ▶ [{v["dur"] or " ? "}] {v["title"]}')
            print(f'    https://www.youtube.com/watch?v={v["id"]}')
        print("\nJSON para colar em CURADOS (projetos/B/topicos.js):", file=sys.stderr)
        print(json.dumps(vivos, ensure_ascii=False, indent=2), file=sys.stderr)


if __name__ == "__main__":
    main()
