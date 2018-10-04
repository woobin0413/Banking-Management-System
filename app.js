var app = require('./config/express')();
var auth = require('./routes/auth')();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
app.use('/', auth);

var topic = require('./routes/topic')();
app.use('/', topic);


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
  console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('Connected at 3000');
});
//
// app.listen(3000, function(){
//   console.log('Connected, 3000 port!');
// })
