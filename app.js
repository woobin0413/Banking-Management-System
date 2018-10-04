var app = require('./config/express')();
var auth = require('./routes/auth')();
app.use('/', auth);

var topic = require('./routes/topic')();
app.use('/', topic);


app.listen(3000, function(){
  console.log('Connected, 3000 port!');
})
