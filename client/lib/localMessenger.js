var receivingMessages = true,
    messageQueue = [];

module.exports = {
  isReceivingMessages,
  setReceivingMessages,
  addMessageToQueue
};

function isReceivingMessages() {
  return receivingMessages;
}

function setReceivingMessages(value) {
  receivingMessages = value;

  if (receivingMessages === true) {
    outputMessageQueue();
  }
}

function addMessageToQueue(message) {
  messageQueue.push(message);
}

function outputMessageQueue() {
  messageQueue.forEach((message) => {
    console.log(message);
  });
}
