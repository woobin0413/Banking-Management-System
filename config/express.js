module.exports =  function(){
  //EXPRESS template engine "PUG"
  var express = require('express');
  var conn = require('./config');
  var session = require('express-session');
  var MySQLStore = require('express-mysql-session')(session);
  //같은 디렉토리는 ./해야한다.
  //express는 session 기능이없다. 그래서 express가
  //세션을 처리하기위하여 express-session이라는 모듈을 사용한다.
  //기본적으로 메모리에 저장 하지만 그 기능을 다른곳으로 교체 (파일) 할때 이 모듈을 쓴다.
  var bodyParser = require('body-parser');
  var app = express();
  app.locals.pretty = true;
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static('/public/'));
  app.use(session({
    secret: '1234DSFs@adf1234!@#$asd',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: conn.config.host,
      port:  conn.config.port,
      user: conn.config.user,
      password: conn.config.password,
      database: conn.config.database
  })
}));
  app.set('view engine', 'pug');
  app.set('views','./views');
  //session id의 값과 count 에 담긴 1이란 값과 연결시켜서 id의값에 접근하려는 사용자
  //count 의 1이라는 값을 가져갈수있다.
  //connect 아이디값의 별로 별도의 데이터를 서버에 저장해서 유지할수있다.
  //express-session이라는 모듈은 메모리에 저장을한다.
  //어플을 껏다 키면 세션 정보는 날라간다.

  return app;
}
