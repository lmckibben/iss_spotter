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
      const msg = `Status Code ${response.statusCode} when fetching coordinates from IP. Response: ${body}`;
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
      const msg = `Status Code ${response.statusCode} when fetching passTimes from coordinates ${body}`;
      callback(Error(msg), null);
      return;
    };
    console.log(body);
  });
  body = JSON.parse(body);
  const passes = body.response;
  callback(null, duration);
};

const nextISSTimesForMYLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          callback(error, null);
          return
        }
        callback(null, passTimes)
      });
    });

    //server down cant use api
    // const tempPassTimes = [
    //   { duration: 529, risetime: 1630050397 },
    //   { duration: 656, risetime: 1630056113 },
    //   { duration: 630, risetime: 1630061954 },
    //   { duration: 615, risetime: 1630067817 },
    //   { duration: 652, risetime: 1630073643 }
    // ]

    // callback(null, tempPassTimes);
  });
};

module.exports = { nextISSTimesForMYLocation };