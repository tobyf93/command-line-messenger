const net = require('net'),
      keypress = require('./lib/keypress'),
      ArgumentParser = require('argparse').ArgumentParser,
      connectionEstablished = require('./lib/connectionEstablished'),
      messageReceived = require('./lib/messageReceived'),
      connectionEnded = require('./lib/connectionEnded');

(function() {
  keypress.listen(process.stdin);

  var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true
  });

  parser.addArgument(
    ['--host'],
    {
      required: true,
      help: 'Address of server.'
    }
  );

  parser.addArgument(
    ['--port', '-p'],
    {
      required: true,
      help: 'Port of server.'
    }
  );

  var args = parser.parseArgs();
  const socket = net.createConnection({ host: args.host, port: args.port })
    .on('connect', () => connectionEstablished(socket))
    .on('data', (message) => messageReceived(message))
    .on('end', () => connectionEnded());
})();
