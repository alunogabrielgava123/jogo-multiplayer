export default function renderScream(game, context, requestAnimationFrame, currentId, menuPontos, doc) {

    clearField(context, menuPontos);

    for (var playerId in game.state.player) {
        const p = game.state.player[playerId];
        context.fillStyle = "grey";
        context.fillRect(p.playerX, p.playerY, 1, 1);
    }

    //render fruts
    for (var fruteId in game.state.frute) {
        const f = game.state.frute[fruteId];
        context.fillStyle = "green";
        context.fillRect(f.fruteX, f.fruteY, 1, 1);
    }

    const idPlayer = game.state.player[currentId];

    if (idPlayer) {
        context.fillStyle = 'yellow';
        context.fillRect(idPlayer.playerX, idPlayer.playerY, 1, 1);
    }

    for (var playerId in game.state.point) {
        const pontos = game.state.point[playerId];
        const elemente = doc.getElementById(playerId);


        if (!elemente) {
            const p = doc.createElement('p');
            p.innerHTML = `${pontos.pointer} ${playerId.substr(playerId.length - 5)}`;
            playerId == currentId ? p.style.color = 'white' : p.style.color = 'red';
            p.setAttribute('id', playerId);
            menuPontos.appendChild(p);
        } else {
            elemente.innerHTML = `${pontos.pointer} ${playerId.substr(playerId.length - 5)}`;
        }
    }



    requestAnimationFrame(() => {
        renderScream(game, context, requestAnimationFrame, currentId, menuPontos, doc)
    });
}


function clearField(context, menuPontos) {
    context.fillStyle = "white";
    context.clearRect(0, 0, 10, 10);
    menuPontos.innerHTML = '';
}


