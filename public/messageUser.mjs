export default function messageUser(contentMessage, message, playerId, id ) {
   const pC = document.createElement('p') 
   const content = document.createElement('div')
   const  p = document.createElement('div'); 
   const payload = message;
    
    p.style.display = 'flex'
    id === playerId ? p.style.justifyContent = 'flex-end' : p.style.justifyContent = 'flex-star' 
    id === playerId ? p.style.color = 'yellow' : p.style.color = 'red' 
    p.style.fontWeight = 'bold';
    content.style.display = 'flex'
    content.style.flexDirection = 'column'
    pC.innerHTML += `${playerId.slice(playerId.length  - 5, playerId.length)} : ${payload}`
    content.appendChild(pC)
    p.appendChild(content)
    contentMessage.appendChild(p); 
}
