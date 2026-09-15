# ═══ FILA DE COMANDOS — OPERÁRIA GEMINI ═══
# A operária lê este arquivo a cada ciclo. Administrador (ZCode) atualiza a fila.
# UM TEMA POR COMANDO. Padrão no PROTOCOLO.md e no prompt de sistema.

- [x] GEM-001: (APROVADA COM AJUSTES ✓ — 5 fatos conferidos e corretos; redefinia
      shuffle/ri [será removido na integração]; temas divergiram dos pedidos).

- [ ] GEM-004: Crie os 5 geradores de BIOLOGIA originalmente pedidos, um sobre cada tema:
      ① sistema nervoso (neurônio/sinapse/sistema central) ② hormônios tireoidianos (T3/T4)
      ③ grupos sanguíneos ABO/Rh (doador universal, aglutininas) ④ fotossíntese
      (fotossistemas II e I, fotólise da água) ⑤ sucessão ecológica (primária vs secundária).
      Mesmo padrão addGen(GBIO, 2, ...) — NÃO redefina shuffle nem ri, apenas use.

- [ ] GEM-002: Crie 5 geradores de HISTÓRIA — addGen(GHIST, 2 ou 3, () => {...}) — um sobre
      cada tema: ① CLT e leis trabalhistas da Era Vargas (1943) ② AI-5 (1968): o que fechou,
      censura e tortura institucionalizadas ③ Era JK (1956-61): Plano de Metas, Brasília,
      automóvel ④ Guerra Fria: Crise dos Mísseis de Cuba (1962), Muro de Berlim (1961-89)
      ⑤ Revolução Industrial: êxodo rural, urbanização, jornadas de 14h, trabalho infantil.
      Datas e fatos conferidos; 4 opcoes sem duplicatas; explicacao com o fato central.

- [ ] GEM-003: Crie 5 geradores de GEOGRAFIA — addGen(GGEO, 2, () => {...}) — um sobre cada
      tema: ① aquífero Guarani (extensão e países) ② industrialização brasileira (1950-80,
      Sudeste) ③ desertos do mundo (Saara, Atacama — diferenças) ④ oceanos (maiores, correntes)
      ⑤ relevo brasileiro (planaltos, planícies, depressões). Dados corretos e conferidos.

- [ ] GEM-005: NOVA DISCIPLINA INFORMÁTICA — crie 5 geradores addGen(GINF, 2, () => {...})
      de HISTÓRIA DA COMPUTAÇÃO E CONCEITOS: quem criou a WWW (Tim Berners-Lee), primeira
      programadora (Ada Lovelace), Alan Turing, o que é open source, memória RAM vs SSD,
      navegador vs sistema operacional. Padrão objeto com shuffle(), gabarito conferido.
- [ ] GEM-006: VASCULHE canais de informática no YouTube (Curso em Vídeo/Gustavo Guanabara,
      CFBCursos, ex.: buscas "curso html css aula", "curso python iniciantes", "redes de
      computadores aula") e liste 10 vídeos NOVOS (não repita os já curados) de 2 a 45 min
      sobre os tópicos inf-*. Entregue no envelope JSON um arquivo com lista em comentário:
      // id | título | duração — um por linha.
