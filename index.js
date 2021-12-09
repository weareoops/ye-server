const express = require("express");
const PORT = process.env.PORT || 3031;
const index = '/index.html';
const socketIO = require('socket.io')

const registerProcessHandler = require('./lib/handlers/processHandler')
const registerResourceHandler = require('./lib/handlers/resourceHandler')
const registerSysInfoHandler = require('./lib/handlers/sysInfoHandler')
const registerUserInfoHandler = require('./lib/handlers/userInfoHandler')
const registerAuthorizeHandler = require('./lib/handlers/authorizeHandler')

const {logger} = require('./lib/logger')
const {removeUser, users, client} = require("./lib/store");

const server = express()
    .use((req, res) => res.sendFile(index, {root: __dirname}))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

const io = socketIO(server, {cors: {origin: '*'}, logger: {
        debug: logger.debug,
        info: logger.info,
        error: logger.error,
        warn: logger.warn
    }})

io.on('connection', (socket) => {
    logger.log({
        level: 'info',
        message: `Socket connected with ID ${socket.id}`
    })

    socket.emit('users:web', {users, clientID: client})

    socket.on('disconnect', () => {
        logger.log({
            level: 'info',
            message: `Socket disconnected with ID ${socket.id}`
        })

        if(socket.id === client){
            users.clientID = null;
        }

        removeUser(socket.id);

        if(users.users){
            users.users.forEach((u) => {
                io.sockets.sockets.get(u.id).emit('users:web', users)
            })
        }
    })

    registerAuthorizeHandler(io, socket, users);
    registerProcessHandler(io, socket, users);
    registerResourceHandler(io, socket, users);
    registerSysInfoHandler(io, socket, users);
    registerUserInfoHandler(io, socket, users);
})