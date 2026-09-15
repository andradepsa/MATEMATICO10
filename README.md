# MATEMÁTICO 10 — Ecossistema Educacional

Plataforma educacional gratuita de matemática e disciplinas gerais: quiz gamificado com 95 mil questões, videoteca com 48 mil videoaulas, e ferramentas de estudo — tudo em HTML/JS puro, sem dependências, funcionando offline.

## 🌐 Ambientes de publicação

| Ambiente | URL | Origem |
|---|---|---|
| **Matemática Dez** (produção principal) | `https://www.matematico10.com.br` | Cloudflare Pages |
| Espelho Cloudflare | `https://matematico10.pages.dev` | Cloudflare Pages |
| GitHub Pages | `https://andradepsa.github.io/MATEMATICO10/` | branch `main` |
| **CYGNA** (portal acadêmico) | Cloudflare Pages | pasta `projetos/F/` |

> ⚠️ Os redirecionamentos de URLs antigas ficam em `_redirects` (Cloudflare) e `404.html` (GitHub Pages). Ao mover arquivos, atualize ambos.

## 📁 Estrutura do repositório

```
MATEMATICO10/
├── index.html            ← PÁGINA MATEMÁTICA DEZ (portal principal — matematico10.com.br)
├── VídeosK10.html        ← Videoteca: 48.172 videoaulas do YouTube
├── PainelIA.html         ← CODEX: painel de comando IA (Gemini/Grok)
├── perfilUdemy.html      ← Publicações acadêmicas (Zenodo/DOI)
├── 404.html              ← Fallback GitHub Pages (redireciona URLs antigas)
├── _redirects            ← Redirecionamentos 301 (Cloudflare Pages)
├── README.md             ← Este arquivo
│
├── assets/               ← DESIGN SYSTEM K10 (DNA visual compartilhado)
│   ├── k10.css           ← Tokens: escuro #0b0e17 · dourado #f5a623 · Inter
│   └── k10.js            ← Navbar unificada (injetada em todas as páginas)
│
├── MeusLinks/            ← Agregador de links pessoais (links.json)
├── chat/                 ← Chat P2P K10
│
└── projetos/
    ├── A/                ← Hyperdimensional Paradox (ENEM/SAT)
    ├── B/                ← ★ CENTRAL DE ESTUDOS (quiz gamificado)
    │   ├── index.html    ←   app principal (311 geradores de questões)
    │   ├── topicos.js    ←   ★ rigor v12.1: gerador→tópico + 436 vídeos curados (oEmbed) + classificador de bancos + queries Zenodo — 147 tópicos
    │   ├── matematica.json  … ← bancos: 95 mil questões
    │   └── TESTE/        ←   versão original legada (não publicar)
    ├── C/                ← Provas OBMEP
    ├── D/                ← Testes ENEM/EUA
    ├── F/                ← ★ CYGNA — portal acadêmico (Cloudflare)
    ├── ferramentas/      ← Ferramentas ativas (Museu, Resolvedor, Xadrez…)
    └── legado/           ← Versões antigas preservadas
```

★ = projetos críticos — **não mover sem atualizar os deployments do Cloudflare**.

## 🎮 Central de Estudos (`projetos/B/`)

- **13 matérias**: Matemática, Português, Inglês, Química, Física, História, Geografia, Biologia, Filosofia, Sociologia, Literatura, Conhecimentos Gerais, **Informática**
- **319 geradores** de questões (matemática paramétrica: nunca repete) — inclui geometria analítica, conjuntos, óptica, eletromagnetismo, botânica, evolução, mundo antigo, Brasil contemporâneo e ciência/cultura
- **~95 mil questões** em 6 bancos JSON (ENEM + vestibares)
- **Vídeo-aula por TÓPICO com rigor v12** (`topicos.js`): cada gerador aponta para um tópico com vídeos curados e verificados via oEmbed; questões dos bancos passam por um classificador estrito com bordas de palavra. **Sem tópico = sem vídeo (nunca vídeo errado)** — ex.: questão de PG sugere aula de PG, nunca de Fourier
- **Player na mesma página**: o vídeo abre num modal (Esc / ✕ fecha e reseta o player)
- **Papers Zenodo por tema da sessão**: busca por `metadata.title` com frases exatas + filtro de relevância do título (nenhum relevante = seção oculta)
- Gamificação: streak diário, anti-repetição (últimas 300), atalhos de teclado
- Cache API: funciona offline após primeira visita

### 🧰 Ferramentas de manutenção (`tools/`)

- `python tools/buscar_videos.py "progressão aritmética" --n 3` — busca novas videoaulas no YouTube **sem API** (extrai da página pública de resultados e confirma cada id via oEmbed); imprime JSON pronto para o `CURADOS` do `topicos.js`

## 🎨 Design System K10 (`assets/`)

Todas as páginas compartilham o mesmo DNA visual — **mesma cara em tudo**:

```html
<!-- incluir em qualquer página do ecossistema -->
<link rel="stylesheet" href="assets/k10.css">
<script defer src="assets/k10.js" data-page="iddapagina"></script>
```

| Token | Valor |
|---|---|
| Fundo | `#0b0e17` |
| Card | `#121827` |
| Dourado (accent) | `#f5a623` |
| Texto | `#eaeef5` |
| Fonte | Inter |

A navbar é injetada automaticamente pelo `k10.js`, com a página atual destacada.

## 🔗 Correlação entre páginas

Tudo conversa: cada recurso usa **caminhos relativos** para os demais (funciona tanto no GitHub Pages quanto no Cloudflare). A navbar K10 aparece em: Home, Central, Videoteca, Painel IA, Meus Links, Publicações e Chat.

## 🚀 Deploy

- **GitHub Pages**: push na `main` publica automaticamente
- **Cloudflare** (matematico10.com.br e CYGNA): deploy conectado a este repositório — pushes disparam builds

