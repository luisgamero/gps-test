var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usernames = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  // console.log('socket object: ', socket);
  socket.on('save-user', function(username){
    usernames.push(username);
    io.emit('online-list', usernames);
    console.log('usernames sent to clients: ', usernames);
  });

  socket.on('chat-message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat-broadcast', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected :(');
  })
});

http.listen(8000, function(){
  console.log('listening on port 8000');
});