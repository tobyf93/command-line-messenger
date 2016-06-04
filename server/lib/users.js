const outputStats = require('./outputStats');

module.exports = {
  add,
  remove,
  find
};

function add(socket) {
  localMessenger.users.push({
    name: undefined,
    socket
  });

  outputStats();
}

function remove(socket) {
  const i = index(socket);

  localMessenger.users = [
    ...localMessenger.users.slice(0, i),
    ...localMessenger.users.slice(i + 1)
  ];

  outputStats();
}

function find(socket) {
  for (var i in localMessenger.users) {
    var user = localMessenger.users[i];
    if (user.socket === socket) {
      return user;
    }
  }
}

function index(socket) {
  for (var i in localMessenger.users) {
    var user = localMessenger.users[i];
    if (user.socket === socket) {
      return i;
    }
  }
}
