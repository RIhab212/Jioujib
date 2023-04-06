const express = require('express')
const { Socket } = require('socket.io')
const app= express()
const server = require('socket.io')(server,{cors:{origin:"*"}})
app.get('/notif ',(req,res)  =>{
    res.render('notif')
})


server.listen(3000,() =>{
    console.log("server running...");
});

is.on('connection',(socket) =>{
    console.log("user connected "+socket.id);
});