const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/main.html');
});

app.get('/room.html', (req, res) => {
    res.sendFile(__dirname + '/room.html');
});

io.on('connection', (socket)=>{
    socket.on('request_message', (msg) => {
        io.emit('response_message', msg);
    });

    socket.on('disconnect', async () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('Connected at 3000');
});

