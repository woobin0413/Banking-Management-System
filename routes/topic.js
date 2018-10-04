module.exports = function(){

  var router = require('express').Router();
  var http = require('http').Server(router);
  var io = require('socket.io')(http);
  const request = require('request');

  let apiKey = '74be192b0326b5dc2bb04884ab39d5e4';
  let t1,t2,t3,l1,l2,l3;

//celcious=> units=metric
 router.get('/homepage', function(req,res){
   res.render('topic/homepage');
 });

 //pug 나 html 에서 데이터를 미리 보여줄때 Get을 사용하며
 //반대로 search 창이나 form 창에서 데이터값을 입력후 엔터 누르면 post방식을이용


 router.get('/weather', function(req,res){

   let url = `http://api.openweathermap.org/data/2.5/group?id=5106834,5100399,4076784&units=imperial&appid=${apiKey}`

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
  res.render('topic/socket_io');
})

    return router;
}
