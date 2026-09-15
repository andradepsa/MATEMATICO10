# ═══ FILA DE COMANDOS — OPERÁRIA GLM ═══
# A operária lê este arquivo a cada ciclo. O administrador (ZCode) atualiza a fila.
# `- [ ]` = pendente · `- [x]` = concluído. Pega o 1º pendente. UM TEMA POR COMANDO.

- [x] CMD-001: (REPROVADA) sobrescrevia Q/addGen · estáticas · erro de média geométrica · circular.
- [x] CMD-004: (REPROVADA) temas ignorados + divisão com explicação falsa (411/500).
- [x] CMD-005: (REPROVADA) temas ignorados de novo + usou mmc()/mdc() que NÃO existem no motor.
- [x] CMD-006: (APROVADA ✓ — auditoria: 0/500 inválidas · gabarito recomputado 500/500 ·
      explicação 500/500 · paramétrico r∈{1..5}). Entrega em fabrica/aprovadas/.

- [x] CMD-007: (APROVADA ✓ — 0/800 inválidas · 12/12 combinações r×h · gabarito e
      explicação 800/800). Entrega em fabrica/aprovadas/.
- [x] CMD-008: (APROVADA ✓ — paramétrica, sinais corretos em todos os casos; polimento
      cosmico da explicação na integração).

- [ ] CMD-009: UM gerador de PROBABILIDADE CONDICIONAL COM URNA: urna com v vermelhas
      (ri(2,9)) e a azuis (ri(2,9)); "Sorteada uma bola e ela é vermelha. Qual a prob. de ser
      a bola 1?" não — crie: duas caixas A e B com composições sorteadas; sorteia-se uma
      caixa (50%) e depois uma bola; dado que saiu vermelha, prob. de ser da caixa A
      (Bayes simples com números pequenos; resposta 2 casas, "numero").
- [ ] CMD-010: UM gerador de MÉDIA GEOMÉTRICA EXATA: triplas = [[2,8],[4,6,9],[1,8,27],[2,2,32],[3,6,8]];
      SÓ use triplas de produto com raiz cúbica exata (confira: 2*8=16 não é cubo → descarte);
      multiplicação verificada: 4*6*9=216→6 ✓ · 1*8*27=216→6 ✓ · 2*2*32=128→? (5,04 ✗ descarte)
      — deixe no código apenas triplas corretas, escolhendo uma aleatoriamente.

- [ ] CMD-002: 5 geradores de BIOLOGIA (addGen(GBIO,...)): sistema nervoso, hormônios
      tireoidianos, grupos sanguíneos ABO, fotossistemas, sucessão ecológica.
- [ ] CMD-003: 5 geradores de HISTÓRIA (addGen(GHIST,...)): Era Vargas (CLT), AI-5,
      Era JK, Guerra Fria (crises), Revolução Industrial (consequências sociais).
