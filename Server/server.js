const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(cors());

io.on('connection',(socket)=>{
    console.log('User connected:',socket.id);
    console.log(socket);
    socket.on('join_room',(room)=>{
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
    })
    socket.on('send_message',({room,username,message})=>{
        io.to(room).emit('Receive_message',{username,message});
    })
      socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
})




server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});