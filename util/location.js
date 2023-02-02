function getCoordsForAddress(address) {
  return {
    lat: 40.7484474,
    lng: -73.9871516,
  };
}
// i dont have API key so i will go with this dummy function

// npm install --save axios
// axios allow to send request from node server to another server;
module.exports = getCoordsForAddress;
