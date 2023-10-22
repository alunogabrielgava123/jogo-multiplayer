/**
 * Player
 *
 * @requires playerId : String
 * @requires dom : Document

*/


//toat new User
export default function toastNewUser(player, document, menuLog, disconnect) {
   //mudar a cor da letra p para vermelho quando for um usuario desconnectando 
   const p = document.createElement('p');
   const payload =  disconnect ?  `${player}, saiu da sala` :`${player}, entrou na sala`;  
    p.style.color = disconnect ? 'gray' : 'gray';
   p.innerHTML += payload;
   menuLog.appendChild(p); 
}


