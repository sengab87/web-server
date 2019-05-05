const request = require("request");
exports.geocode = (address, callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2VuZ2FiODciLCJhIjoiY2p2N2prb3c4MGdwMTN5cGZ1OWx3NXNuMyJ9.ZCyClVHP64rQ9_7qrKL8nw";
  request({url, json:true}, (error,{body}) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const data = {
        latitude: body.features[0].center[0],
        longitude:  body.features[0].center[1]
      }
      callback(undefined, data);
    }
  });
};
