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
