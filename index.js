var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var withinRange = require('helpers/index.js').withinRange;
var usernames = [];
var target = {
  lat: 34.0192699,
  long: -118.4943795
};

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

  socket.on('chat-message', function(data){
    console.log('message: ' + data);

    if (Math.abs(data.lat - target.lat) < 0.000025 && Math.abs(data.long - target.long) < 0.000025) {
      io.emit('chat-broadcast', data.username + " COLLISION WITH TARGET!");
    } else {
      io.emit('chat-broadcast', data.username + " position: " + data.lat + data.long);
    }
  });

  socket.on('disconnect', function(){
    console.log('user disconnected :(');
  });
});

var port = process.env.PORT || 5000;

http.listen(port, function(){
  console.log('listening on port: ', port);
});
