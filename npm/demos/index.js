#!/usr/bin/env node
var axios = require('axios')
var data = {params:{}};
if(process.argv[2]){
  data.params.city = process.argv[2];
}
axios.get('http://api.jirengu.com/getWeather.php',data).then(function (response) {
    console.log(response.data.results[0].currentCity);
    console.log('pm2.5: '+response.data.results[0].pm25);
    console.log(response.data.results[0].index[0].des);
    console.log(response.data.results[0].weather_data[0].date);
    console.log(response.data.results[0].weather_data[0].weather);
    console.log(response.data.results[0].weather_data[0].wind);
    console.log(response.data.results[0].weather_data[0].temperature);
  })
  .catch(function (error) {
    console.log(error)
  });
