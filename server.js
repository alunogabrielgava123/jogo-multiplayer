import express from 'express';
import http from 'http';
import Game from './public/game.mjs'
import { Server } from "socket.io";

const app = express();

//Utilizando arquivos de forma estatica dentro do node
app.use(express.static('public'));

const server = http.createServer(app);
const sockets = new Server(server);
const game = new Game();

//servidor starta com 0 jogadores
//a medida que os jogadores vao conecatando via socket eu vou colocar mais
//dessa forma o servidor ficar responsave por controlar as conexoes do jogo
var counter_player = 0;


game.subscribe((command) => {
    sockets.emit(command.type, command);
})

//inicializando o jogo
game.start();

sockets.on('connection', socket => {
    
    
    //arrumar depois essa logica de adicionar e retirar players 
    counter_player +=1;
    game.newPlayerCounter({ playerId : socket.id, counter : (counter_player)})  

    game.addPlayer({ playerId: socket.id });

    game.addPointer({ playerId : socket.id });
    
    socket.on('send_message', (command) => {
      game.receiverMessage(command)  
    })
    
    socket.on('disconnect', () => {
        counter_player -=1;
        game.deletePlayer(socket.id);
        game.deletePointer({ playerId : socket.id })
        game.disconnectPlayer({ playerId : socket.id, counter : (counter_player) })
    })

    socket.on('move-player', (command) => {
        command.playerId = socket.id;
        command.type = 'move-player';

        game.movePlayer(command);
    });

    
    socket.emit('setup', game.state);
    
    

})


server.listen(3001, () => {
    console.log('Rodando porta 3001')
})
