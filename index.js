//const { fetchMyIP } = require('./iss');
//const { fetchCoordsByIP } = require('./iss');
//const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMYLocation } = require('./iss');
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


nextISSTimesForMYLocation((error, tempPassTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (const pass of tempPassTimes) {
    const date = new Date();
    let timeStamp = pass.risetime;
    let duration = pass.duration;
    date.setUTCSeconds(timeStamp);
    console.log(`Next pass at ${date} for ${duration} seconds`);
  }
  console.log(tempPassTimes);
});