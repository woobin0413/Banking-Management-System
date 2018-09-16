module.exports = function(passport){

  var router = require('express').Router();
  var conn = require('../config/config');

  //하나의 파일을 만들기 위한 form tag
  router.get('/', function(req,res){
    res.render('auth/login');
  });

  router.post('/auth/login', function(req,res){
    var username = req.body.username;
    if(username) {
      res.redirect('/welcome');
    }
  });

  //HTML 로 보낼시 (bootstrap 이용시)
  router.get('/welcome', (req, res) => {
   res.sendFile('welcome.html', {
     root: './views/auth/'
   });
});

    return router;
}