module.exports = function(){

  var router = require('express').Router();
  //하나의 파일을 만들기 위한 form tag
  router.get('/', function(req,res){
    res.render('view');
  });

  router.get('/login', function(req,res){
    res.render('auth/login');
  });

//HTML 로 보낼시 (bootstrap 이용시)
  router.get('/welcome', (req, res) => {
   res.sendFile('welcome.html', {
     root: './views/auth/'
   });
});

  router.post('/auth/login', function(req,res){
    var username = req.body.username;
    if(username) {
      res.redirect('/welcome');
    }

  });
    return router;
}
