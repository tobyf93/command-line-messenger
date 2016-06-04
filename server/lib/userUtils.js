module.exports = {
  findUser,
  getUserIndex
};

function findUser(socket) {
  for (var i in localMessenger.users) {
    var user = localMessenger.users[i];
    if (user.socket === socket) {
      return user;
    }
  }
}

function getUserIndex(socket) {
  for (var i in localMessenger.users) {
    var user = localMessenger.users[i];
    if (user.socket === socket) {
      return i;
    }
  }
}
