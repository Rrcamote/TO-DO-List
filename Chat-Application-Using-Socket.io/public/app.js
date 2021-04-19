const socket = io();
const msgText = document.querySelector('#msg')
const btnSend = document.querySelector('#btn-send')
const chatBox = document.querySelector('.chat-content')
const displayMsg = document.querySelector('.message')
var typing = false;

var name;

btnSend.addEventListener('click', (e) => {
    e.preventDefault()
    sendMsg(msgText.value)
    msgText.value = '';
    msgText.focus();
    chatBox.scrollTop = chatBox.scrollHeight;
})

const sendMsg = message => {
    let msg = {
        user: name,
        message: message.trim()
    }

    display(msg, 'you-message')
    socket.emit('sendMessage', msg)
}

socket.on('sendToAll', msg => {
    display(msg, 'other-message')
    chatBox.scrollTop = chatBox.scrollHeight;
})

const display = (msg, type) => {
    const msgDiv = document.createElement('div')
    let className = type
    msgDiv.classList.add(className, 'message-row')
    let times = new Date().toLocaleTimeString()

    let innerText = `
    <div class="message-title">
    😇<span>${msg.user}</span>
    </div>
    <div class="message-text">
        ${msg.message}
    </div>
    <div class="message-time">
        ${times}
    </div>
    `;
    msgDiv.innerHTML = innerText;
    displayMsg.appendChild(msgDiv)
}


$(document).ready(function () {
    do {
        name = prompt('What is your name?')
    } while (!name)

    document.querySelector('#your-name').textContent = name
    msgText.focus()

    socket.emit('login',name)
    

    $("#msg").keyup(() => {
        console.log('test')
        socket.emit('typing', name);
    })

    socket.on('online-user', (online) => {
        $('#online-mi').empty(); 
        online.online.forEach(data => {
            $('#online-mi').append(`<li style="font-size:23px">${data}</li>`);
           
        })
        
    })


    socket.on('display', (data) => {
        $('.typing').text(`${data} is typing...`)
    })

    $('body').click(function () {
        socket.emit('untype');
    })
    socket.on('untype', () => {
        $('.typing').text("")
    })

    socket.on('disconnect-user', (online) => {
       delete online[name]
    })


})

