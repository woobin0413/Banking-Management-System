module.exports = function(){

  var router = require('express').Router();
  var config = require('../config/config.json');
  var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
  var storage = multer.diskStorage({
    //upload 할떄마다 이름이 랜덤으로 설정되있는데 그것을 원래이름이나 위치를 다시 변경시 필요사항
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
  });

  var upload = multer({ storage: storage })
  const request = require('request');
  // const apiKey = "74be192b0326b5dc2bb04884ab39d5e4";
  let t1,t2,t3,l1,l2,l3;

  //celcious=> units=metric
  router.get('/homepage', function(req,res){
    res.render('topic/homepage');
  });
  router.post('/upload', upload.single('userfile'), function(req, res){
    res.send('Uploaded! : '+req.file); // object를 리턴함
    console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
  });

  // req.file 은 `avatar` 라는 필드의 파일 정보입니다.
  // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.


  //pug 나 html 에서 데이터를 미리 보여줄때 Get을 사용하며
  //반대로 search 창이나 form 창에서 데이터값을 입력후 엔터 누르면 post방식을이용


  router.get('/weather', function(req,res){

    let url = `http://api.openweathermap.org/data/2.5/group?id=5106834,5100399,4076784&units=imperial&appid=${config.apiKey}`

    request(url, function (err, response, body) {
      let weather = JSON.parse(body)


      for (var i = 0; i < 3; i++) {
        if(i==0) {
          t1 = weather.list[i].main.temp;
          l1 = weather.list[i].weather[0].main;

        }
        if(i==1) {
          t2 = weather.list[i].main.temp;
          l2 = weather.list[i].weather[0].main;
        }
        else {
          t3 = weather.list[i].main.temp;
          l3 = weather.list[i].weather[0].main;
        }
      }
      // location = weather.list[i].name;


      res.render('topic/weather',{t1: t1, t2: t2,t3:t3,l1:l1,l2:l2,l3:l3});
    });
  });
  //
  //img 형식으로 날씨및 정보나올수잇게
  //http://api.openweathermap.org/data/2.5/weather?zip=36116&mode=html&units=imperial&appid=74be192b0326b5dc2bb04884ab39d5e4
  router.post('/weather', function(req,res){
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${req.body.zipcode}&units=imperial&appid=${config.apiKey}`
    request(url, function (err, response, body) {

      if(err){
        res.status(500).send('Internal Server Error');
        console.log('error: ' ,err);

      } else {
        if(req.body.zipcode.length != 5) {
          res.render('topic/weather', {text: "Zipcode does not exist"})
        } else {
          let weather = JSON.parse(body)
          let temp = weather.main.temp
          let location = weather.name;
          let day_weather = weather.weather[0].main;
          let day_img = weather.weather[0].icon
          let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;

          if(day_weather == 'Clear'){
            res.render('topic/weather', {text: message + " " + day_weather, weathercond: "day-sunny"});

          } else {
            res.render('topic/weather', {text: message + " " + day_weather, weathercond: "day-lightning"});

          }
        }
      }

    });
  })

  router.get('/socket_io',function(req,res){
    res.send('socket_io');
  });
  return router;
}
