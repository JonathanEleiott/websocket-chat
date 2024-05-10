const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Connected to the web socket');

  socket.on('new message sent', (msg) => {
    console.log(`a message was sent: ${msg}`);

    io.emit('new message relayed', msg);
  })
});



app.get('/', (req, res, next) => res.sendFile(__dirname + '/index.html'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`listening on port ${PORT}`))