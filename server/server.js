const net = require('net'),
      ArgumentParser = require('argparse').ArgumentParser,
      serverListening = require('./lib/serverListening'),
      connectionEstablished = require('./lib/connectionEstablished');

(function() {
  var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true
  });

  parser.addArgument(
    [ '--host' ],
    {
      required: false,
      help: 'Set server host.  Defaults to 0.0.0.0'
    }
  );

  parser.addArgument(
    [ '-p', '--port' ],
    {
      required: false,
      help: 'Set server port.  Defaults to 3000'
    }
  );

  var args = parser.parseArgs();
  const server = net.createServer()
    .on('listening', () => serverListening(server))
    .on('connection', (socket) => connectionEstablished(socket))
    .on('error', (err) => {
      throw err;
    });

  server.listen({
    host: args.host || '0.0.0.0',
    port: args.post || 3000
  });
})();
