const entries = [];
const users = {
    clientID: null,
    users: []
};

const removeUser = (userID) => {
    users.users.splice(users.users.findIndex(e => e.id === userID), 1)
}

const addUser = (userID) => {
    users.users.push({id: userID})
}

module.exports = {entries, users, removeUser, addUser}