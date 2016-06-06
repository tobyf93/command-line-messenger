(Currently Under Construction)

#Overview
An instant messaging service with a command line interface because who needs fancy GUI's.  This project is built with Node.js, using the core Network module to communicate through TCP sockets over a Local Area Network.

#Server
The TCP server acts as a middleman to the clients during communications.  It is responsible for keeping track of all open sockets at any given point in time.  When a client first connects, the TCP socket is stored, along with a username.  This allows the server to emit messages across all open sockets as well as associate any given message with a username.  When a client disconnects from the server this data is removed from memory.

#Client
The client is fairly dumb in that it is only concerned with sending/receiving messages.  Once a connection has been established with the server it too has a handle on the TCP socket.  When a user wants to send data such as their username or message, it is written to the socket.  Likewise when the client receives a message emitted from the server it is received and echo'ed out via stdout.  You may have spotted an issue with using stdin/stdout for two-way communication.  See below for details...

#Why?
Why make an instant messenger for the command line?  I'd be asking the same thing...  This project was the result of being at [campJS 2016](http://campjs.com/) with no internet and very little resources (only Javascript/Node.js documentation).  I quickly realised how much i relied on communication tools like Slack and Hipchat and thought why not have a crack at my own.  Is it practical?  No.  Is it secure?  Nope.  But it has given me the chance to learn about:
- Node.js and its core modules
- New ES6 syntax

#Usage
- Clone the repo `git clone git@github.com:tobyf93/command-line-messenger.git`
- Install Node.js (>= v5.11.1)
- Install project dependencies `npm i`
- Get hosts IP address `ifconfig`
- Fire up TCP server `node server.js --host HOST_IP --port HOST_PORT`
- Connect clients `node client.js --host HOST_IP --port HOST_PORT`

*Note:*  I only ever tested this on a Local Area Network but who knows.  It could work fine over the interwebs...

#Using stdin/stdout For Two-way Communication
##Problem \#1
Lets start up a server and connect to it via localhost:3000
```
node server.js --host localhost --port 3000
Started server: {"address":"127.0.0.1","family":"IPv4","port":3000}

node client.js --host localhost --port 3000
Connected To Server: {"address":"127.0.0.1","family":"IPv4","port":63237}
Name: Toby
[13:5:8] TOBY JOINED THE CHAT
```
So far so good!  We have established a connection, provided our username and the server has acknowledged this by emitting a status update.  Now lets start chatting!
```
[13:5:8] TOBY JOINED THE CHAT
this is my message                  // client input
[13:8:5] TOBY | this is my message  // message emitted from server
```
See the duplicate messages?  It seems as though when a user inputs a message via the command line the `readline` interface in Node.js writes it to the stdout steam before being able to read in the stdin steam.  Not sure if there is a way to intercept data written to stdout?

##Problem \#2
Coming soon...

#Todos
- Only accept new client connections if a unique username is provided.
- Use a library like [blessed](https://github.com/chjj/blessed) to create a client user interface that:
  - Has message thread separate to user input
  - Has 'Online Users' panel

#Contributing
- Fork it (https://github.com/tobyf93/command-line-messenger)
- Create feature branch `git checkout -b awesome-feature`
- Commit changes `git commit -am 'Some awesome change'`
- Push branch `git push origin awesome-feature`
- Create a pull request

#Copyright & License
All code in this repository is released under the terms of the MIT License.

Copyright (C) 2016 Toby Flemming
