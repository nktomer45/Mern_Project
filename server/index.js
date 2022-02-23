const http = require('http');
const express = require('express');
const cors = require("cors");
const socketIO = require('socket.io');
const { Socket } = require('dgram');

const app = express();
const port = 4500 || process.env.PORT;
const users = [{}];

app.use(cors())
app.get("/", (req, res) => {
    res.send("Hello ITS WORKING")
})
const server = http.createServer(app);

const io = socketIO(server);
io.on("connection", (socket) => {
    console.log("New Connection");
    socket.on('joined', (user) => {
        users[socket.id]= user.user;

        console.log(`${user.user} has joined `);
        socket.broadcast.emit('userJoined', { user: "Admin", message: `${user.user} has joined` })
        socket.emit('welcome', { user: "Admin", message: `welcome to the chat ${user.user}` })
    });
    socket.on('message',({message,id}) => {
        console.log('jkduy',users[id], message);
        io.emit('Sendmessage',{user:users[id],message,id});
    })
    socket.on('disconnect',()=>{
        // console.log('jhhsd',users);
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});
      console.log(` user left`);
  })
})
server.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`);
})