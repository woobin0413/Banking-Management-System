module.exports = function(){

  var router = require('express').Router();
  //하나의 파일을 만들기 위한 form tag
  router.get('/', function(req,res){
    res.render('auth/login');
  });

  //HTML 로 보낼시 (bootstrap 이용시)
  router.get('/welcome', (req, res) => {
   res.sendFile('welcome.html', {
     root: './views/auth/'
   });
});

    return router;
}
