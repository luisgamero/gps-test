var math = require('mathjs');

var haversine = function(lat1, long1, lat2, long2){
  lat1 = toRadians(lat1);
  long1 = toRadians(long1);
  lat2 = toRadians(lat2);
  long2 = toRadians(long2);

  var dlat = lat1 - lat2;
  var dlong = long1 - long2;

  var angle = math.pow(math.sin(dlat/2),2) + math.cos(lat1) * math.cos(lat2) * math.pow(math.sin(dlong/2),2);
  var circle = 2 * math.atan2(math.sqrt(angle), math.sqrt(1-angle));
  var distance = 6367000 * circle;
  return distance;
}

var toRadians = function(deg) {
  return deg * Math.PI / 180;
}

exports.withinRange = function(lat1, long1, lat2, long2, m) {
  if (haversine(lat1,long1,lat2,long2) <= m) {
    return true;
  }
}

var lat1 =48.859065
var long1 = 2.294518

var lat2 = 48.857470
var long2 = 2.294497

console.log("Distance is", haversine(lat1,long1,lat2,long2));
