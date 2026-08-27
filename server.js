const express=require('express');
const http=require('http');
const os=require('os');
const QRCode=require('qrcode');
const {Server}=require('socket.io');

const app=express(); const server=http.createServer(app); const io=new Server(server);
const PORT=process.env.PORT||3000;
let game={teams:[],turnTeamId:null,turnCount:1};
let vote=null; let voteTimer=null;

app.use(express.static('public'));
app.get('/',(_,res)=>res.redirect('/professor.html'));
app.get('/aluno',(_,res)=>res.sendFile(__dirname+'/public/aluno.html'));
app.get('/qr.png',async(req,res)=>{
  try{const u=String(req.query.url||''); const png=await QRCode.toBuffer(u,{width:420,margin:2});res.type('png').send(png)}
  catch(e){res.status(500).send('QR error')}
});

function publicVote(){
 if(!vote)return null;
 return {voteId:vote.voteId,open:vote.open,optionCount:vote.optionCount,eligibleTeamIds:vote.eligibleTeamIds,kind:vote.kind,alreadyVotedTeamIds:Object.keys(vote.responses)};
}
function sendGame(){io.emit('game:state',game)}
function progress(){
 if(!vote)return;
 io.emit('vote:progress',{voteId:vote.voteId,count:Object.keys(vote.responses).length,total:vote.eligibleTeamIds.length,kind:vote.kind});
}
function closeVote(){
 if(!vote||!vote.open)return;
 vote.open=false;clearTimeout(voteTimer);
 const results={};
 for(const id of vote.eligibleTeamIds){
   const choice=Object.prototype.hasOwnProperty.call(vote.responses,id)?vote.responses[id]:null;
   results[id]={choice,correct:choice===vote.correctIndex,answered:choice!==null};
 }
 const payload={voteId:vote.voteId,kind:vote.kind,results,count:Object.keys(vote.responses).length,total:vote.eligibleTeamIds.length};
 io.emit('vote:closed',{voteId:vote.voteId});
 io.emit('vote:result',payload);
 setTimeout(()=>{vote=null},1000);
}

io.on('connection',socket=>{
 socket.emit('game:state',game);
 if(vote&&vote.open)socket.emit('vote:open',publicVote());

 socket.on('professor:state',data=>{
   if(data&&Array.isArray(data.teams)){game=data;sendGame()}
 });
 socket.on('professor:openVote',(data,ack)=>{
   if(vote&&vote.open)closeVote();
   vote={
     voteId:'V'+Date.now(),open:true,question:data.question||'',optionCount:Number(data.optionCount)||4,
     correctIndex:Number(data.correctIndex),eligibleTeamIds:Array.from(new Set(data.eligibleTeamIds||[])),
     duration:Number(data.duration)||30,kind:data.kind||'collective',responses:{}
   };
   io.emit('vote:open',publicVote());progress();
   voteTimer=setTimeout(closeVote,(vote.duration*1000)+250);
   if(ack)ack({ok:true,voteId:vote.voteId});
 });
 socket.on('professor:closeVote',data=>{if(vote&&data&&data.voteId===vote.voteId)closeVote()});
 socket.on('student:hello',data=>{socket.data.teamId=data&&data.teamId||null;socket.emit('game:state',game);if(vote&&vote.open)socket.emit('vote:open',publicVote())});
 socket.on('student:join',data=>{socket.data.teamId=data&&data.teamId||null;io.emit('student:joined',{teamId:socket.data.teamId})});
 socket.on('student:vote',(data,ack)=>{
   if(!vote||!vote.open)return ack&&ack({ok:false,message:'A votação já foi encerrada.'});
   const teamId=String(data.teamId||'');
   if(!vote.eligibleTeamIds.includes(teamId))return ack&&ack({ok:false,message:'Sua equipe não participa desta votação.'});
   if(Object.prototype.hasOwnProperty.call(vote.responses,teamId))return ack&&ack({ok:false,message:'A equipe já respondeu.'});
   const choice=Number(data.choice);
   if(!Number.isInteger(choice)||choice<0||choice>=vote.optionCount)return ack&&ack({ok:false,message:'Alternativa inválida.'});
   vote.responses[teamId]=choice; ack&&ack({ok:true}); progress();
   if(Object.keys(vote.responses).length>=vote.eligibleTeamIds.length)setTimeout(closeVote,500);
 });
});

function lanIPs(){
 const out=[];for(const ifs of Object.values(os.networkInterfaces()))for(const x of ifs||[])if(x.family==='IPv4'&&!x.internal)out.push(x.address);return out;
}
server.listen(PORT,'0.0.0.0',()=>{
 console.log('\nEduTrack conectado iniciado.');
 console.log(`Professor: http://localhost:${PORT}/professor.html`);
 for(const ip of lanIPs())console.log(`Alunos (mesma rede Wi-Fi): http://${ip}:${PORT}/aluno`);
 console.log('\nMantenha esta janela aberta durante a partida.\n');
});