# ═══ DIVISÃO DE TRABALHO — MELHORIA CONTÍNUA DA CENTRAL DE ESTUDOS ═══

> Meta do ciclo: elevar a cobertura de classificação dos bancos (hoje: mat 87% · física 93% ·
> história 59% · biologia 57% · gerais 77% · geo 97%) SEM quebrar o que funciona.
> Lacunas medidas vivem em `localStorage.chave "ce10lacunas"` do app — use os padrões abaixo.

---

## 🟦 GLM — `work/glm` — GERADORES DE MATEMÁTICA
- Criar novos geradores `addGen(GMAT, ...)` seguindo o estilo existente em
  `projetos/B/index.html` (Q(pergunta, correta, tipo, explicação) ou objeto com opcoes/correta).
- Alvos (tópicos com lacuna nos bancos): geometria espacial, análise combinatória avançada,
  probabilidade condicional, trigonometria (lei das senas/cossenos), geometria analítica
  (circunferência), logaritmos aplicados, matrizes e determinantes.
- REGRA DE OURO: para CADA gerador novo, o tópico precisa existir em `topicos.js`
  (ou ser proposto em NOTAS.md) e passar em 100 validações sem opções duplicadas.

## 🟩 KIMI — `work/kimi` — TÓPICOS E VÍDEOS (história, biologia, gerais)
- Propor novos tópicos + classificador (regex com bordas de palavra, testado contra falsos
  positivos) para as lacunas de história (575 amostras sem tópico: Brasil contemporâneo,
  governo/presidentes, revoltas) e biologia (647: fisiologia, hormônios, tecidos).
- Curar vídeos: usar `tools/buscar_videos.py` (busca YouTube sem API + oEmbed).
  Entregar lista `tópico → [{id, title, dur}]` em `governanca/ENTREGA-KIMI.json`.
- NÃO editar `topicos.js` diretamente (é gerado por build) — entregar dados, o
  administrador integra e regenera.

## 🟨 QWEN — `work/qwen` — AUDITORIA E CONHECIMENTO GERAL
- Ampliar geradores de Conhec. Gerais/Astro/História da ciência (GART) e os bancos de
  perguntas culturais; revisar explicações dos geradores existentes (clareza + precisão).
- Auditoria contínua: rodar varredura de links, metatags e falsos positivos do
  classificador; reportar achados em `governanca/RELATORIO-qwen.md`.

## 🟥 ZCODE (administrador) — `main`
- Integra e regenera `topicos.js`; roda auditoria completa (sintaxe, invariantes,
  E2E no navegador, mobile, navegação); faz merge das branches aprovadas;
  publica a main (1 push por ciclo); publica relatórios de aceite/rejeição.
- Auditoria das entregas feita por LEITURA (raw.githubusercontent.com) = cota zero.

---

## Rituais
- Cada operária: lote → entrega na própria branch → relatório → CONTINUA no próprio lote seguinte.
- Administrador: a cada ciclo, lê branches, audita, integra, publica e atualiza este arquivo
  com os novos números de cobertura.
