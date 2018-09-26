module.exports = function(){

  var router = require('express').Router();
  const request = require('request');

  let apiKey = '74be192b0326b5dc2bb04884ab39d5e4';
  let city = 'portland';
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

//celcious=> units=metric
  router.post('/homepage', function(req,res){
    var zip = req.body.zipcode;
    request(url, function (err, response, body) {
      if(err){
          res.status(500).send('Internal Server Error');
          console.log(err);
      } else {
        let weather = JSON.parse(body)
        let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render(message);
      }
    });
  })


  //하나의 파일을 만들기 위한 form tag
  router.get('/homepage', function(req,res){
    res.render('topic/homepage');
  });

  // var apiURI = "http://api.openweathermap.org/data/2.5/weather?q="+"Seoul"+"&appid="+"&APPID=74be192b0326b5dc2bb04884ab39d5e4";
  //       $.ajax({
  //           url: apiURI,
  //           dataType: "json",
  //           type: "GET",
  //           async: "false",
  //           success: function(resp) {
  //               console.log(resp);
  //               console.log("현재온도 : "+ (resp.main.temp- 273.15) );
  //               console.log("현재습도 : "+ resp.main.humidity);
  //               console.log("날씨 : "+ resp.weather[0].main );
  //               console.log("상세날씨설명 : "+ resp.weather[0].description );
  //               console.log("날씨 이미지 : "+ resp.weather[0].icon );
  //               console.log("바람   : "+ resp.wind.speed );
  //               console.log("나라   : "+ resp.sys.country );
  //               console.log("도시이름  : "+ resp.name );
  //               console.log("구름  : "+ (resp.clouds.all) +"%" );
  //           }
  //       });



    return router;
}
