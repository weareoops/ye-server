const {entries} = require("../store");

module.exports = (io, socket, users) => {
    const sendResources = (payload) => {
        entries.push(payload)

        if(users.users){
            users.users.forEach((u) => {
                io.sockets.sockets.get(u.id).emit('resource:web', payload)
            })
        }
    }

    socket.on("resource:client", sendResources)
}