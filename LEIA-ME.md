# EduTrack Conectado — votação automática

## Como iniciar
1. Instale o Node.js 20 ou superior.
2. Abra o Terminal dentro desta pasta.
3. Execute: `npm install`
4. Execute: `npm start`
5. Abra no computador do professor: `http://localhost:3000/professor.html`
6. O QR Code aparece no painel direito. Os celulares precisam estar na mesma rede Wi‑Fi do computador.

## O que já está automatizado
- Controle do aluno por celular.
- Botões A/B/C/D e E quando a questão tiver 5 alternativas.
- Uma resposta por equipe.
- Equipe bloqueada não vota.
- Placar sincronizado no celular.
- Questões coletivas: correção e pontuação automáticas.
- Sala de Incidentes: correção, pontos e bloqueios automáticos.
- Incidente Crítico: correção e efeitos automáticos.
- Final: correção automática.
- A votação fecha automaticamente quando todas as equipes elegíveis respondem ou quando o tempo termina.
- O professor também pode encerrar a votação antes pelo painel.

## Observação de rede
O QR Code usa o endereço do navegador do professor. Para os celulares acessarem, abra o painel do professor usando o endereço IP exibido pelo servidor (por exemplo `http://192.168.0.15:3000/professor.html`), e não `localhost`.

## Novidade v2.1 — Pódio estilo Kahoot
Após o fechamento e correção automática de uma votação, o painel do professor mostra a classificação atual em pódio:
- 3º lugar aparece primeiro;
- depois 2º lugar;
- por último 1º lugar;
- exibe pontos e casa atual;
- volta automaticamente ao tabuleiro após alguns segundos ou pelo botão “VOLTAR AO TABULEIRO”.


## v2.3 — correção do travamento após votação
- A votação coletiva agora finaliza a casa diretamente, sem depender do painel manual de julgamento.
- A rotina limpa `dice` e `diceLocked` antes de trocar a equipe.
- O placar é sincronizado novamente depois da pontuação e depois da troca de turno.
- O painel do professor recupera o identificador da votação se a página reconectar durante uma questão.
- Foi adicionado o botão **Liberar casa** como recuperação de emergência. Use somente se a votação já terminou e o jogo continuar preso.


## v2.4 — experiência de projeção
- Perguntas e alternativas agora ocupam a tela inteira do projetor.
- Tipografia maior para leitura em sala.
- Ao fechar a votação, aparece um popup exclusivo com a resposta correta.
- A explicação da questão também aparece quando disponível.
- O popup permanece por 6 segundos para leitura.
- Depois dele, o pódio é exibido automaticamente.


## v2.5 — recuperação e diagnóstico
- O painel de QR Code pode ser fechado pelo botão × e reaberto por “QR / Votação”.
- “Cancelar votação / destravar” encerra uma votação problemática sem corrigir respostas e libera os controles.
- Erros JavaScript e falhas de Promise abrem automaticamente uma tela de diagnóstico.
- O diagnóstico mostra versão, conexão Socket.IO, equipe/turno/casa, estado do dado, modal ativo e stack do erro.
- Use “COPIAR DIAGNÓSTICO” e envie o texto para análise.


## v2.6 — identidade fixa e voto editável
- Após entrar como uma equipe, o seletor desaparece e o aparelho fica vinculado àquela equipe durante a partida.
- O controle passa a mostrar a equipe vinculada em vez de oferecer troca.
- Durante o tempo da questão, a equipe pode trocar A/B/C/D/E quantas vezes quiser.
- Vale sempre a última alternativa enviada antes do encerramento.
- A votação não fecha automaticamente quando todas as equipes respondem; permanece aberta até o cronômetro terminar ou o professor encerrar manualmente.
- O botão selecionado permanece destacado no celular para indicar a resposta atual.


## v2.7 — questões autocontidas
- Reformuladas perguntas e explicações que pressupunham contato prévio com “o material”, tabelas ou exemplos externos.
- As questões passam a apresentar o conceito ou situação de forma autocontida.
- Mantidos os conteúdos e gabaritos; foi alterada apenas a dependência de referências externas.


## v2.8 — Sala da Diretoria: Desafio Final
- Chegar à Casa 36 dá direito de disputar a vitória; não significa vitória automática.
- Cada tentativa tem até 5 perguntas.
- A equipe vence assim que alcançar 3 acertos.
- A tentativa termina imediatamente ao atingir 3 erros, pois 3/5 já se torna impossível.
- Se falhar, a equipe permanece na Casa 36 e a partida segue para as demais equipes.
- No próximo turno, a equipe que permaneceu na Casa 36 pode fazer uma nova tentativa.
- As perguntas são sorteadas sem repetição dentro da mesma tentativa, usando o banco final e questões de síntese.
- O painel mostra acertos, erros, questão atual e quanto falta para vencer.
