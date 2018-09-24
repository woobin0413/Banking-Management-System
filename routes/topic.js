module.exports = function(){

  var router = require('express').Router();
  //하나의 파일을 만들기 위한 form tag
  router.get('/homepage', function(req,res){
    res.render('topic/homepage');
  });

    return router;
}
