# ═══ PROCEDIMENTOS OFICIAIS — AUDITORIA & QUALIDADE (MATEMÁTICO 10) ═══
# Recuperados das conversas e do trabalho executado. ESTE ARQUIVO É A FONTE DA VERDADE.
# Regra-mãe: PUBLICAÇÃO NO GITHUB SOMENTE APÓS MELHORIAS ROBUSTAS + TODAS AS CAMADAS VERDES.

## 0. FILOSOFIA (dos critérios de "bom código")
Correção · Testabilidade · Clareza · Simplicidade · Robustez · Desempenho · Segurança ·
Reprodutibilidade · **Verificabilidade matemática** (a que diferencia o projeto).
Cadeia de confiança: Fórmula → algoritmo → implementação → testes → comparação
independente → busca de contraexemplos → (futuro) prova formal.

## 1. AUDITORIA EM CAMADAS (rodar na ordem; 1 falha = não publica)

### Camada 0 — Estrutural
- [ ] Sintaxe de TODO script JS (index inline, topicos.js, sw.js, entregas): compila sem erro
- [ ] HTML: IDs duplicados = 0 · lang/charset/viewport/title/description presentes
- [ ] Encoding: arquivos são UTF-8 válidos ANTES de qualquer edição (não quebrar acentos)

### Camada 1 — Invariantes dos geradores
- [ ] Rodar CADA gerador N vezes (padrão: 25–120×) no motor real (VM, sem DOM)
- [ ] validarQuestao: 4–5 opções · correta numérica em range · sem opções duplicadas ·
      sem null/vazio · pergunta 1–400 chars · 0 exceções
- [ ] Toda questão gerada TEM tópico (mapa gerador→tópico) e o tópico TEM vídeo

### Camada 2 — Auditoria matemática (independente)
- [ ] Recomputar a resposta de cada questão gerada por FÓRMULA independente
      (ex.: juros M=C(1+i)^n; PG aₙ=a₁·q^(n-1); média geométrica cbrt/produto)
- [ ] Divergência = 0 tolerada. (Histórico: 511/511 após correção de 89 divergências)
- [ ] Casos-limite: divisão por 1, valores mínimos/máximos dos ranges, arredondamentos

### Camada 3 — Classificador de bancos (regex)
- [ ] Bordas de palavra (\b) em termos curtos (lição "lula"⊂"célula")
- [ ] Escapar "/" em padrões (lição km/h fechando regex literal)
- [ ] Desempate por MATCH MAIS LONGO entre tópicos
- [ ] Caça a falsos positivos: lista de ARMADILHAS conhecidas deve classificar como
      esperado (briófitas≠rio · angiospermas≠conjunção · revolta≠volt · Programa≠grama
      · universo≠verso · indústria de transformação≠química · E. coli→vírus/bactérias)
- [ ] Cobertura medida em amostra (≥1.500/banco): reportar número honesto por matéria
- [ ] Lacuna = comportamento correto (sem vídeo), registrada em telemetria (ce10lacunas)

### Camada 4 — Conteúdo externo (vídeos & papers)
- [ ] TODO vídeo novo verificado via oEmbed (HTTP 200 = vivo); morto = removido
- [ ] Duração saudável (2–35 min +bonus) · dedupe por título normalizado
- [ ] Papers: query com FRASE EXATA + `metadata.title:` + qualificador (termo genérico
      sozinho = lixo: "combinatorial effect of rhizobacteria") + filtro de relevância do
      título com a própria regex do tópico · sem resultado relevante = seção OCULTA
- [ ] Busca de vídeos nova: SEM API (página pública de resultados + oEmbed) — tools/buscar_videos.py

### Camada 5 — E2E no navegador REAL
- [ ] App carrega: 12 matérias, TOPICOS.totalTopicos correto, 0 erros de console
- [ ] Cenário crítico histórico (bug PG): questão PG → vídeos de PG → ZERO Fourier →
      modal abre NA MESMA PÁGINA → ESC fecha → iframe descarregado
- [ ] Fluxo completo: quiz de 10 (banco+gerador), responder, modais, resultado,
      papers Zenodo por tema ao vivo
- [ ] Armadilha Fourier: sem tópico → 0 vídeos + lacuna registrada

### Camada 6 — Mobile 390px
- [ ] Sem scroll horizontal · modal cabe · navbar visível · 0 erros

### Camada 7 — Navegabilidade de TODO o site (antes de publicar)
- [ ] Varredura de TODAS as páginas .html do repo: href/src locais resolvem (caminho real)
- [ ] Cruzamento _redirects ↔ 404.html (MAPA) consistente (hoje: 13↔13 ✓)
- [ ] Links absolutos só onde o 404.html reescreve em runtime (GitHub Pages prefixo)

## 2. SERVICE WORKER (armadilha de publicação)
- [ ] SEMPRE bumpar CACHE ('ce10-app-v3') quando mudar app shell — senão usuários
      ficam presos na versão antiga (bug real encontrado: SW servia index antigo)

## 3. PUBLICAÇÃO (regra do dono)
- [ ] Só publica após: lote de MELHORIAS ROBUSTAS + camadas 0–7 verdes
- [ ] Empacotar entrega (zip) → UM ÚNICO push (economia de cota) → deploys disparam
- [ ] Nunca publicar conteúdo de operária sem integração + auditoria próprias

## 4. FÁBRICA (operárias IA em loop)
- [ ] Cada operária: branch própria (work/glm etc.), escopo do TAREFAS.md, nunca a main
- [ ] Entrega em envelope JSON {arquivo, conteudo, mensagem} — validada antes de aceita
- [ ] Auditoria de entrega = camadas aplicáveis à entrega (geradores: camadas 1–2 OBRIGATÓRIAS)
- [ ] REPROVADA → devolve com achados na fila de comandos (a operária lê o arquivo)
- [ ] Comandos para operárias = arquivo no GitHub (COMANDOS-glm.md); admin atualiza a fila;
      operária lê a cada ciclo; loop NUNCA para; admin NUNCA interrompe — só observa e audita
- [ ] Loop script: erro/cota = espera e continua (nunca exit)

## 5. SEGURANÇA / HIGIENE
- [ ] Tokens/chaves: só em arquivos FORA do repositório (fabrica/ é local; nunca push)
- [ ] Token GitHub = Fine-grained, só repo MATEMATICO10, Contents Read/Write
- [ ] Senha/2FA de contas NUNCA passam por chat nem por script (lição da conversa)

## REGISTRO DE EXECUÇÕES (histórico que provou o método)
- v12.1: 7.775 questões · 0 inválidas · 0 sem tópico/vídeo · PG→pg ✓ Fourier→null ✓
- Cobertura bancos: mat 87% · fis 93% · geo 97% · hist 59% · bio 57% · ger 77%
- 147 tópicos · 436 vídeos oEmbed-verificados · queries Zenodo endurecidas ao vivo
- E2E 8/8 · fluxo 10/10 com tópico · mobile ✓ · 34 páginas sem link quebrado · SW v3
- 1ª entrega da operária GLM (CMD-001) REPROVADA na auditoria (ver FILA/COMANDOS-glm.md)
