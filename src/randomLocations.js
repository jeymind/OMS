// modified from https://github.com/rmrs/random-location

const EARTH_RADIUS = 6371000; // meters
const DEG_TO_RAD = Math.PI / 180.0;
const THREE_PI = Math.PI * 3;
const TWO_PI = Math.PI * 2;

const toRadians = deg => deg * DEG_TO_RAD;
const toDegrees = rad => rad / DEG_TO_RAD;

/*
Given a centerPoint C and a radius R, returns a random point that is on the
circumference defined by C and R.

centerPoint C is of type { lat: A, lng: B }
Where -90 <= A <= 90 and -180 <= B <= 180.

radius R is in meters.

Based on: http://www.movable-type.co.uk/scripts/latlong.html#destPoint
*/
const randomCircumferencePoint = (
  centerPoint,
  radius,
  randomFn = Math.random
) => {
  const sinLat = Math.sin(toRadians(centerPoint.lat));
  const cosLat = Math.cos(toRadians(centerPoint.lat));

  // Random bearing (direction out 360 degrees)
  const bearing = randomFn() * TWO_PI;
  const sinBearing = Math.sin(bearing);
  const cosBearing = Math.cos(bearing);

  // Theta is the approximated angular distance
  const theta = radius / EARTH_RADIUS;
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);

  let rLatitude, rLongitude;
  rLatitude = Math.asin(sinLat * cosTheta + cosLat * sinTheta * cosBearing);

  rLongitude =
    toRadians(centerPoint.lng) +
    Math.atan2(
      sinBearing * sinTheta * cosLat,
      cosTheta - sinLat * Math.sin(rLatitude)
    );

  // Normalize lng L such that -PI < L < +PI
  rLongitude = ((rLongitude + THREE_PI) % TWO_PI) - Math.PI;

  return { lat: toDegrees(rLatitude), lng: toDegrees(rLongitude) };
};

/*
Given a centerPoint C and a radius R, returns a random point that is inside
the circle defined by C and R.

centerPoint C is of type { lat: A, lng: B }
Where -90 <= A <= 90 and -180 <= B <= 180.

radius R is in meters.
*/
const randomCirclePoint = (centerPoint, radius, randomFn = Math.random) => {
  // http://mathworld.wolfram.com/DiskPointPicking.html
  return randomCircumferencePoint(
    centerPoint,
    Math.sqrt(randomFn()) * radius,
    randomFn
  );
};

/*
Returns the distance in meters between two points P1 and P2.

P1 and P2 are of type { lat: A, lng: B }
Where -90 <= A <= 90 and -180 <= B <= 180.

Basically it is the Haversine distance function.
Based on: http://www.movable-type.co.uk/scripts/latlong.html
*/
const distance = (P1, P2) => {
  const rP1 = {
    lat: toRadians(P1.lat),
    lng: toRadians(P1.lng)
  };
  const rP2 = {
    lat: toRadians(P2.lat),
    lng: toRadians(P2.lng)
  };

  const D = {
    lat: Math.sin((rP2.lat - rP1.lat) / 2),
    lng: Math.sin((rP2.lng - rP1.lng) / 2)
  };

  const A =
    D.lat * D.lat + D.lng * D.lng * Math.cos(rP1.lat) * Math.cos(rP2.lat);

  const C = 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A));

  return EARTH_RADIUS * C;
};

const haversine = distance;

module.exports = {
  distance,
  haversine,
  randomCircumferencePoint,
  randomCirclePoint
};
