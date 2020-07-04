let Scratch = require("scratch-api");
let http = require("https");
const PROJECT_ID = 409584673;
const API_KEY = "087f9536b449e11a1312c04571842202"; 
const CHARS = "abcdefghijklmnopqrstuvwxyzàèìòùẁỳáéíóúẃýâêîôûäëïöü -_0123456789,.";

function encode(items) {
  let number = '';
  console.log("encode", items);
  for (let i = 0; i < items.length; i++) {
    for (let i2 = 0; i2 < items[i].length; i2++) {
      number += ('0' + (CHARS.indexOf(items[i][i2])+1)).slice(-2);
    }
    if (i + 1 < items.length) {
      number += '00';
    }
  }
  return number;
}

function decode(number) {
  console.log("decode", number);
  let array = [];
  let string = '';
  for (let i = 0; i < number.length; i += 2) {
    let j = number[i]+number[i+1];
    if (j === '00') {
      array.push(string);
      string = '';
    } else {
      string += CHARS[j-1];
    }
  }
  array.push(string);
  string = '';
  return array;
}

Scratch.UserSession.load(function(err, user) {
  if (err) return console.error(err);
    user.cloudSession(PROJECT_ID, function(err, cloud) {
    cloud.on("set", function(name, value) {
      if (name === "☁ Request" && value != 0) {
        console.log(decode(value));
        let city = decode(value)[0];
        Scratch.requestJSON({
          hostname: "api.openweathermap.org",
          port: 443,
          path: "/data/2.5/weather?q=" + encodeURI(city) + "&appid=" + API_KEY,
          method: "GET",
        }, function(err, weather) { 
          console.log(weather.main);
          let result;
          if (weather.main == undefined) {
            result = [city, "0"];
          } else {
            console.log(weather.weather[0].description);
            result = [city, "1", weather.main.temp.toString(), weather.main.feels_like.toString(), weather.main.temp_min.toString(), weather.main.temp_max.toString(), weather.weather[0].description];
          }
          cloud.set("☁ Response", encode(result));
          cloud.set("☁ Request", 0);
      });
      }
    });
  });
});