module.exports = function(){

  var router = require('express').Router();
  const request = require('request');

  let apiKey = '74be192b0326b5dc2bb04884ab39d5e4';


//celcious=> units=metric
 router.get('/homepage', function(req,res){
   res.render('topic/homepage');
 });

 //pug 나 html 에서 데이터를 미리 보여줄때 Get을 사용하며
 //반대로 search 창이나 form 창에서 데이터값을 입력후 엔터 누르면 post방식을이용
 router.get('/weather', function(req,res){
   let temps = {36116,11758,}
   res.render('topic/weather',{temp:30, weatherCondition:50});
 });



router.post('/weather', function(req,res){
  let url = `http://api.openweathermap.org/data/2.5/weather?zip=${req.body.zipcode}&units=imperial&appid=${apiKey}`
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


          res.render('topic/weather', {text: location + " : " + day_weather});

       }
     }

   });

})

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



    return router;
}
