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


game.start();

game.subscribe((command) => {
    sockets.emit(command.type, command);
})


sockets.on('connection', socket => {

    game.addPlayer({ playerId: socket.id });

    game.addPointer({ playerId : socket.id });

    socket.on('disconnect', () => {
        game.deletePlayer(socket.id);
        game.deletePointer({ playerId : socket.id })
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