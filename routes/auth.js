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
      var sql = 'SELECT * FROM USERS WHERE username = ? and password = ?';
      var params = [username,hash];
      conn.query(sql,params,function(err,row,field){

      })
        console.log(hash);
        res.redirect('/welcome');
    } else {
      return res.send(`
        <h1>
        <span style="color:red">This USERNAME ALREADY EXISTS!!!</span>
        </h1>
        `)
    }
  });

  router.get('/register', function(req, res){
    res.render('auth/register');
  });

  router.post('/auth/register', function(req,res){
    var hash = crypto.createHmac('sha256', secret)
                     .update(req.body.password)
                     .digest('hex');
    var sql = 'SELECT * FROM USERS';
    var email = req.body.email;

    var nickname = req.body.nickname;

    conn.query(sql,function(err,row,field){
      if(err) {
        console.log(err);
        res.status(500);
      } else {
          sql = 'SELECT * FROM USERS WHERE username = ?';
          var params = [email]
          conn.query(sql,params, function(err,rows,fields){
            if(err) {
              console.log(err);
              res.status(500);
            } else {
              if(rows.length > 0) {
                return res.send(`
                  <h1><span style="color:red">USERNAME ALREADY EXISTS!!!</span></h1>
                  `)
              } else {
                sql = 'INSERT INTO USERS (username,password, nickname)';
                sql += 'VALUES(?,?,?)';
                params = [email,hash,nickname];
                conn.query(sql,params,function(err,rows,fields){
                  if(err) {
                    console.log(err);
                    res.status(500);
                  } else {
                    res.redirect('/');
                  }
                });
              }
            }
          });
        }});
      });
  //HTML 로 보낼시 (bootstrap 이용시)
  router.get('/welcome', (req, res) => {
   res.sendFile('welcome.html', {
     root: './views/auth/'
   });
});

    return router;
}
