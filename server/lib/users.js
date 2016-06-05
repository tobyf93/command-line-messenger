const localMessenger = require('./localMessenger');

module.exports = {
  add,
  remove,
  find
};

function add(socket) {
  localMessenger.addUser({
    name: undefined,
    socket
  });
}

function remove(socket) {
  const i = index(socket);

  localMessenger.removeUser(i);
}

function find(socket) {
  var users = localMessenger.getUsers();

  for (var i in users) {
    var user = users[i];
    if (user.socket === socket) {
      return user;
    }
  }
}

function index(socket) {
  var users = localMessenger.getUsers();

  for (var i in users) {
    var user = users[i];
    if (user.socket === socket) {
      return i;
    }
  }
}
