module.exports = (io, socket, users) => {
    const sentUsers = () => {
        if(users.users){
            users.users.map((u) => {
                io.sockets.sockets.get(u.id).emit("users:web", {users: users.users, clientID: users.clientID});
            })
        }
    }

    socket.on("users:web", sentUsers)
}