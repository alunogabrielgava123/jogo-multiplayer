 export default function keyDown(document) {
    const observer = [];
    var playerId = null;

    function subcribe(functionHandler) {
        observer.push(functionHandler);
    }

    function notifyAll(command) {
        for (var i = 0; i < observer.length; i++) {
            observer[i](command);
        }
    }

    function registerPlayer(id) {
        playerId = id;
    }
    
    document.addEventListener("keydown", keyDownListener);

    function keyDownListener(event) {
        const keypress = event.key;

        const command = {
            type : 'move-player',
            playerId: playerId,
            keypress,
        };

        notifyAll(command);
    }

    return {
        subcribe,
        registerPlayer
    };
}

