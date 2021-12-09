module.exports = (io, socket, users) => {
    const getProcesses = (payload) => {
        if(users.clientID){
            io.sockets.sockets.get(users.clientID).emit('process:client', payload)
        }
    }

    const sentProcesses = (payload) => {
        if(users.users){
            users.users.forEach((u) => {
                io.sockets.sockets.get(u.id).emit('process:web', payload)
            })
        }
    }


    socket.on("process:client", sentProcesses)
    socket.on("process:web", getProcesses)
}