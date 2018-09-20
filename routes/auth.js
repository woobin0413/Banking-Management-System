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
    var hash = crypto.createHmac('sha256', secret)
                     .update(password)
                     .digest('hex');
    if(username && password) {
        console.log(hash);
        res.redirect('/welcome');
    } else {
      res.redirect('/')
    }
  });

  router.get('/register', function(req, res){
    res.render('auth/register');
  });

  router.post('/auth/register', function(req,res){
    var hash = crypto.createHmac('sha256', secret)
                     .update(req.body.password)
                     .digest('hex');
    var sql2 = 'SELECT * FROM USERS';
    conn.query(sql2,function(err,row,field){
      if(err) {
        console.log(err);
        res.status(500);
      } else {
        for (var i in row) {
          console.log(row[i].username);
        }
      }
    });
    /*
    if(req.body.email && req.body.password && req.body.nickname) {
      var sql = 'INSERT INTO users (username,password,nickname)';
      sql += 'VALUES(?,?,?)';

      var params = [req.body.email,hash,req.body.nickname];
      conn.query(sql,params,function(err,rows,fields){
        if(err){
          console.log(err);
          res.status(500);
        } else {
          conn.end();
        }
      });
    res.redirect('/');
  } else {
    res.send(`
      <P>Either Username, password, or nickname hasn't been inputed </P>
      <p>Try again</p>
      `)
  }
  */
  });

  //HTML 로 보낼시 (bootstrap 이용시)
  router.get('/welcome', (req, res) => {
   res.sendFile('welcome.html', {
     root: './views/auth/'
   });
});

    return router;
}
