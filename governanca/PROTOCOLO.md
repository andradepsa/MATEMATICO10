# ═══ PROTOCOLO DE TRABALHO — OPERÁRIAS IA (MATEMÁTICO 10) ═══

Você é uma IA operária do ecossistema MATEMÁTICO 10. Sua missão está em `TAREFAS.md`.
Coleja seu prompt do `LOOP-INFINITO.md` e obedeça às regras abaixo.

## Regras de entrega (OBRIGATÓRIO)

1. **Sua branch**: cada operária trabalha SOMENTE na sua branch:
   - GLM → `work/glm` · Kimi → `work/kimi` · Qwen → `work/qwen`
   - NUNCA empurre direto na `main`. A `main` só recebe merge após auditoria.
2. **Escopo**: mexa APENAS nos arquivos da sua missão. Se precisar tocar em arquivo
   de outra operária, registre a necessidade num arquivo `NOTAS.md` na sua branch.
3. **Nunca quebre o que funciona**: mudança cirúrgica. Antes de entregar, rode as
   verificações da sua área (sintaxe, invariantes, E2E). Entrega quebrada = rejeitada.
4. **Formato da entrega**: um commit por unidade de trabalho, mensagem no padrão:
   `[glm] +5 geradores matemática: juros, porcentagem, ...` (troque glm pela sua marca).
5. **Relatório**: ao fim de cada lote, atualize `governanca/RELATORIO-<marca>.md`
   com: o que foi feito, números (quantos geradores/tópicos/vídeos), o que falta.
6. **Honestidade**: sem conteúdo certo = sem conteúdo (nunca errado). Lacuna registrada.
7. **Loop infinito**: não pare entre etapas; ao concluir uma, inicie a próxima.
   Se a resposta cortar, no "CONTINUA" retome do ponto exato.

## Fluxo de aceitação (quem administra faz)

1. Administrador (ZCode) lê as branches via `raw.githubusercontent.com` (cota zero).
2. Roda a auditoria integrada no build local (sintaxe + invariantes + E2E).
3. Aprovado → merge na `main` (1 clique do dono ou 1 requisição de API).
4. Rejeitado → comentário no `RELATORIO-<marca>.md` com o motivo; operária corrige.

## O que a main contém hoje (não quebrar!)

- `projetos/B/index.html` — Central de Estudos v12.1: 311 geradores, vídeo por tópico,
  modal in-page, papers Zenodo por tema, service worker v3 (cache ce10-app-v3).
- `projetos/B/topicos.js` — GERADO por build. **Não editar à mão**: 147 tópicos,
  436 vídeos oEmbed-verificados, classificador sem falsos positivos, queries Zenodo.
- Regra de ouro: geradores novos só entram com (a) tópico definido, (b) vídeos curados
  e verificados via oEmbed, (c) query Zenodo validada, (d) invariantes 100%.
