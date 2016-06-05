// Reason why i wanted a localMessenger module was to:
// - encapsulate data
// - provide hooks into system from a central place

var users = [],
    messageLog = [];

module.exports = {
  getUsers,
  getUserCount,
  addUser,
  removeUser,
  getMessageLog,
  getMessageLogCount,
  logMessage
};

function getUsers() {
  return users;
}

function getUserCount() {
  return users.length;
}

function addUser(user) {
  users.push(user);
  outputStats();
}

function removeUser(i) {
  users = [
    ...users.slice(0, i),
    ...users.slice(i + 1)
  ];
  outputStats();
}

function getMessageLog() {
  return messageLog;
}

function getMessageLogCount() {
  return messageLog.length;
}

function logMessage(message) {
  messageLog.push(message);
  outputStats();
}

function outputStats() {
  var userNames = users.reduce((userNames, user) =>  {
    if (user.name) {
      userNames.push(user.name);
    }

    return userNames;
  }, []);

  console.log(`${getUserCount()} Users Online:`);
  userNames.forEach((userName) => console.log(`- ${userName}`));
  console.log(`Messages: ${getMessageLogCount()}`);
  console.log('\n');
}
