const   readline = require('readline'),
        rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

module.exports = connectionEstablished;

function connectionEstablished(socket) {
  const address = socket.address();
  console.log('Connected To Server: %j', address);

  function prompt() {
    rl.question('', (message) => {
      socket.write(message);
      prompt();
    });
  }

  rl.question('Name: ', (name) => {
    socket.write(name);
    prompt();
  });
}
