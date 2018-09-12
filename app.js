var app = require('./config/express')();
var topic = require('./routes/topic')();
app.use('/', topic);

app.listen(3000, function(){
  console.log('Connected, 3000 port!');
})
