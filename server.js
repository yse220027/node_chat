// Express の作成
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
// publicフォルダを、Web公開
app.use(express.static(__dirname + '/public'));

// HTTPサーバの作成
const { createServer } = require('node:http');
const server = createServer(app);


//環境変数読み込み
const dotenv = require('dotenv');
dotenv.config();
const host = process.env.HOST;
const port = process.env.PORT;

// Socket.ioで通信
// Socket.io モジュール読み込み
const { Server } = require('socket.io');
// Socket.io 作成
const io = new Server(server);

// connection event
io.on('connection', (socket) => {
    console.log('connected!!!')

    //chatメッセージの受信
    socket.on('chat_message', (data) => {
        console.log(socket.id);
        console.log(data);
        //送信ユーザのSocketIDを追加
        data.socket_id = socket.id;
        //接続しているユーザにメッセージを送信
        io.emit('chat_message', data);
    })
})

// HTTPサーバー待機
server.listen(port, host, ()=> {
    console.log('Server Listen...');
    console.log(`listening on http://${host}:${port}`);
})