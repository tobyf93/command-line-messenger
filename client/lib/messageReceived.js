const localMessenger = require('./localMessenger');

module.exports = dataReceived;

function dataReceived(data) {
  data = data.toString();

  if (localMessenger.isReceivingMessages()) {
    console.log(data);
  } else {
    localMessenger.addMessageToQueue(data);
  }
}
