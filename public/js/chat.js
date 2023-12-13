// Chatサーバに接続
const URL = "";
const socket = io.connect(URL); 

socket.on('chat_message', (data) => {
    console.log(data);
    var p = document.createElement('p');
    p.innerText = data.socketID + ": " + data.message;
    document.getElementById('chat-list').prepend(p);
})

socket.on('move', (data) => {
    var message = `${data.x}, ${data.y}`;
    document.getElementById('moveArea').innerText = message;
})

function handleMousemove(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    var data = {
        x: mouseX,
        y: mouseY,
    }
    // console.log(data)
    socket.emit('move', data);
}

function sendMessage() {
    // console.log('send message!!')
    var message = document.getElementById('message').value;
    console.log(message);
    if (message) {
        //データを作成
        var data = { 
            message: message
        }
        socket.emit('chat_message', data);
    }
}