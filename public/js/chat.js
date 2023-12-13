// Chatサーバに接続
const URL = "";
const socket = io.connect(URL); 

socket.on('chat_message', (data) => {
    console.log(data);
    var p = document.createElement('p');
    p.innerText = data.socket_id + ": " + data.message;
    document.getElementById('chat-list').prepend(p);
})

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