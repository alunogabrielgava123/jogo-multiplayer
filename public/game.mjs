export default function Game() {
    //Estado do jogo
    const state = {
        frute: {},
        player: {},
        point: {},
        screen: {
            with: 50,
            height: 50
        }
    };


    const observer = [];


    function subscribe(functionObserver) {
        observer.push(functionObserver);
    }


    function notifyAll(command) {
        for (let i = 0; i < observer.length; i++) {
            const functionObserver = observer[i];
            functionObserver(command);
        }
    }

    function start() {
        setInterval(addFrute, 1000);
    }


    function addPlayer(player) {

        const playerId = player.playerId;
        const playerX = "playerX" in player ? player.playerX : Math.floor(Math.random() * state.screen.with);
        const playerY = "playerY" in player ? player.playerY : Math.floor(Math.random() * state.screen.height);

        state.player[playerId] = {
            playerX,
            playerY,
        };

        notifyAll({
            type: 'add-player',
            playerId,
            playerX,
            playerY,
        });

    }

    function setState(newState) {
        Object.assign(state, newState);
    }


    //ta aqui o erro
    function addFrute(command) {
        const fruteId = command ? command.fruteId : Math.floor(Math.random() * 10000000).toString();
        const fruteX = command ? command.fruteX : Math.floor(Math.random() * state.screen.with);
        const fruteY = command ? command.fruteY : Math.floor(Math.random() * state.screen.height);


        state.frute[fruteId] = {
            fruteX: fruteX,
            fruteY: fruteY
        };

        notifyAll({
            type: 'add-frute',
            fruteId,
            fruteX,
            fruteY
        });
    }

    function deleteFrute(fruteId) {

        const id = fruteId;
        delete state.frute[id.fruteId];

        notifyAll({
            type: 'delete-frute',
            fruteId
        })
    }

    function deletePlayer(playerId) {
        delete state.player[playerId];

        notifyAll({
            type: 'delete-player',
            playerId: playerId
        })
    }


    //Pontos
    function addPointer(command) {
        //ele ira buscar o ponto no estado do game e 
        //verificar se o ponto é nulo
        const playerId = command.playerId;
        const pointer = 'pointer' in command ? command.pointer : 0;

        state.point[playerId] = {
            pointer: pointer
        };

        notifyAll({
            type: "add-pointer",
            playerId: playerId,
            pointer: pointer
        });
    }

    function updatePoint(command) {
        //pegar o pointer;
        //No momento que houver colisao buscarei o valor do pointer e colocarei mais um evento
        const playerId = command.playerId;
        const pointer = state.point[playerId].pointer;
        const newPointer = pointer + 1;

        //mudando o estado do meu jogo;
        state.point[playerId] = {
            pointer: newPointer
        }


        notifyAll({
            type: 'change-pointer',
            playerId: playerId,
            pointer: newPointer
        })

    }


    function deletePointer(command) {
        const playerId = command.playerId;
        const pointer = state.point;
        delete pointer[playerId];

        notifyAll({
            type: 'delete-pointer',
            playerId: playerId
        })
    }

    function checkCollisionFrute(playerId) {
        const player = state.player[playerId];

        for (var fruteId in state.frute) {
            const frute = state.frute[fruteId];

            if (frute.fruteX === player.playerX && frute.fruteY === player.playerY) {

                deleteFrute({ fruteId: fruteId });
                updatePoint({ playerId: playerId });
            }
        }
    }



    //Move player camada de jogo que movimenta os ususarios;
    function movePlayer(command) {
        const keyBoardMove = {
            ArrowUp: function (player) {
                if (player.playerY > 0)
                    addPlayer({
                        playerId: command.playerId,
                        playerX: player.playerX,
                        playerY: player.playerY - 1,
                    });
                return;
            },
            ArrowDown: function (player) {
                if (player.playerY < state.screen.height - 1)
                    addPlayer({
                        playerId: command.playerId,
                        playerX: player.playerX,
                        playerY: player.playerY + 1,
                    });
                return;
            },
            ArrowLeft: function (player) {
                if (player.playerX > 0)
                    addPlayer({
                        playerId: command.playerId,
                        playerX: player.playerX - 1,
                        playerY: player.playerY,
                    });
                return;
            },
            ArrowRight: function (player) {
                if (player.playerX < state.screen.height - 1)
                    addPlayer({
                        playerId: command.playerId,
                        playerX: player.playerX + 1,
                        playerY: player.playerY,
                    });
                return;
            },
        };

        const move = command.keypress;
        const makeMove = keyBoardMove[move];
        const player = state.player[command.playerId];
        if (player && makeMove) {
            makeMove(player);
            checkCollisionFrute(command.playerId);
        }
    }

    return {
        state,
        movePlayer,
        addPlayer,
        deletePlayer,
        addFrute,
        deleteFrute,
        setState,
        subscribe,
        start,
        addPointer,
        deletePointer,
        updatePoint
    };
}



