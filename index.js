//const { fetchMyIP } = require('./iss');
//const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
//});

// fetchCoordsByIP('209.121.229.15', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , coordinates);
// });

// const corrds = { 
//   latitude: 49.27670, 
//   longitude: -123.13000 
// };

// fetchISSFlyOverTimes(corrds, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return
//   }

//   console.log('It worked! Returned passTimes:'  , passTimes);
// });