module.exports = function(passport){

  var router = require('express').Router();
  var conn = require('../config/config');
  const crypto = require('crypto');
  const secret = 'jpfaojdf3$@#$@#523efj2';

  //하나의 파일을 만들기 위한 form tag
  router.get('/', function(req,res){
    res.render('auth/login');
  });

  router.post('/auth/login', function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var sql = "INSERT INTO users SET ?"
    var hash = crypto.createHmac('sha256', secret)
                     .update(password)
                     .digest('hex');
    if(username) {
      if(password) {
        console.log(hash);
        res.redirect('/welcome');
      }
    }
  });

  router.get('/register', function(req, res){
    res.render('auth/register');
    });
  });

  //HTML 로 보낼시 (bootstrap 이용시)
  router.get('/welcome', (req, res) => {
   res.sendFile('welcome.html', {
     root: './views/auth/'
   });
});

    return router;
}
