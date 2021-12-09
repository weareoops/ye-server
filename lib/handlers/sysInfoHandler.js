const {entries} = require("../store");
module.exports = (io, socket, users) => {
    const getSysInfo = (payload) => {
        if(users.clientID){
            console.log('client exists')
            io.sockets.sockets.get(users.clientID).emit('sysinfo:client', payload);
        }
    }

    const sentSysInfo = (payload) => {
        if(users.users){
            users.users.forEach((u) => {
                io.sockets.sockets.get(u.id).emit('sysinfo:web', {sysInfo: payload, entries: entries.slice(entries.length - 31, entries.length - 1)})
            })
        }
    }

    socket.on("sysinfo:web", getSysInfo)
    socket.on("sysinfo:client", sentSysInfo)
}