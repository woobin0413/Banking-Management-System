var app = require('./config/express')();
var auth = require('./routes/auth')();
var server = require('http').createServer(app);

app.use('/', auth);

var topic = require('./routes/topic')();
app.use('/', topic);

//
// app.listen(3000, function(){
//   console.log('Connected, 3000 port!');
// })


server.listen(3000, () => {
  console.log('Server listening at port on 3000');
});
