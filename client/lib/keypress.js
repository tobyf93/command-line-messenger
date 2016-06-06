const localMessenger = require('./localMessenger'),
      keypress = require('keypress');

module.exports.listen = listen;

function listen() {
  keypress(process.stdin);

  process.stdin.on('keypress', function (ch, key) {
    if (key.name === 'return') {
      localMessenger.setReceivingMessages(true);
    } else {
      localMessenger.setReceivingMessages(false);
    }
  });
}
