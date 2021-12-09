let {addUser} = require("../store");
const {logger} = require("../logger");

module.exports = (io, socket, users) => {
    const authorizeSocket = (payload) => {
        if(payload.client){
            users.clientID = socket.id;

            logger.log({
                level: 'info',
                message: `Client connected with ID ${socket.id}`
            })
        } else if(payload.web){
            addUser(socket.id)

            logger.log({
                level: 'info',
                message: `Web connected with ID ${socket.id}`
            })
        }
    }

    socket.on('hi', authorizeSocket)
}