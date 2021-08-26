const request = require("request");

const fetchMyIP = function(callback) {
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    body = JSON.parse(body);
    const ipAddress = body.ip;
    callback(error, ipAddress);
  });
};


const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    };
    body = JSON.parse(body);
    const coordinates = {
      latitude: body.latitude,
      longitude: body.longitude
    };
    callback(null, coordinates);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return
    };
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching passTimes for coordinates ${body}`;
      callback(Error(msg), null);
      return;
    };
    console.log(body);
  });
  body = JSON.parse(body);
  const passes = body.response;
  callback(null, duration);
};

module.exports = { fetchISSFlyOverTimes };