const request = require("request");
exports.forecast = (latitude,longitude, callback) => {
  const url = "https://api.darksky.net/forecast/9cf7f470b48430172259f0ca2dac05ec/" + latitude + "," + longitude + "?units=si";
  request({url, json:true},(error,{body}) => {
    if (error) {
      callback("unable to connect to weather service",undefined);
    }else if (body.error){
      callback("unable to find location",undefined);
    } else {
      const data = body.daily.data[0].summary + " It is currently " +body.currently.temperature;
      callback(undefined,data);
    }
  });
};
