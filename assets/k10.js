/* ═══════════════════════════════════════════════════════════════
   K10 NAV — Navegação unificada do ecossistema MATEMÁTICO 10
   Injeta a navbar idêntica em todas as páginas, com:
   caminho relativo resolvido automaticamente + página ativa destacada
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // 1. Resolver a raiz do site a partir do próprio src do script
  var script = document.currentScript;
  if (!script) {
    var all = document.querySelectorAll('script[src*="k10.js"]');
    script = all[all.length - 1];
  }
  var src = script ? script.getAttribute('src') : 'assets/k10.js';
  // 'assets/k10.js' → '' (raiz) · '../assets/k10.js' → '../' · '../../assets/k10.js' → '../../'
  var root = src.replace(/(^|\/)assets\/k10\.js.*$/, '/').replace(/^\/$/, '');

  // 2. Página atual (marcada via data-page no <script>)
  var page = script ? (script.getAttribute('data-page') || '') : '';

  // 3. Estrutura educacional integrada — tudo conversa com tudo
  var LINKS = [
    { id: 'inicio',     ico: '🏠', lbl: 'Início',             href: root + 'index.html' },
    { id: 'central',    ico: '🎮', lbl: 'Central de Estudos', href: root + 'projetos/B/index.html' },
    { id: 'videoteca',  ico: '▶️', lbl: 'Videoteca',          href: root + 'V%C3%ADdeosK10.html' },
    { id: 'painelia',   ico: '🤖', lbl: 'Painel IA',          href: root + 'PainelIA.html' },
    { id: 'links',      ico: '🔗', lbl: 'Links',              href: root + 'MeusLinks/MeusLinks.html' }
  ];

  // 4. Montar navbar
  var nav = document.createElement('nav');
  nav.id = 'k10nav';

  var logo = document.createElement('a');
  logo.className = 'k10-logo';
  logo.href = root + 'index.html';
  logo.innerHTML = '<span class="k10-logo-dot"></span>' +
    '<span class="k10-brand-full">MATEMÁTICO </span><b>10</b>';

  var wrap = document.createElement('div');
  wrap.className = 'k10-links';
  LINKS.forEach(function (l) {
    var a = document.createElement('a');
    a.href = l.href;
    a.className = (l.id === page) ? 'active' : '';
    a.title = l.lbl;
    a.innerHTML = '<span class="k10-ico">' + l.ico + '</span><span class="k10-lbl">' + l.lbl + '</span>';
    wrap.appendChild(a);
  });

  nav.appendChild(logo);
  nav.appendChild(wrap);

  // 5. Injetar no topo do body
  document.body.insertBefore(nav, document.body.firstChild);

  // 6. Carregar o CSS do design system (se ainda não foi incluído via <link>)
  if (!document.querySelector('link[href*="k10.css"]')) {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = root + 'assets/k10.css';
    document.head.appendChild(css);
  }
})();
