const bodies = require('./bodies');
const elements = require('./elements');


/**
 * ----------------------------------
 * Elitist: Format Number
 *
 * Large numbers will have added commas.
 * Used for credits and population
 * ----------------------------------
 */
const formatNumber = (x) => {
  if (x != undefined) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

/**
 * ----------------------------------
 * Elitist: Distance between 2 systems
 * ----------------------------------
 */
exports.distanceInLY = (origin, dest) => {
  let distance = Math.sqrt(
    Math.pow(dest[0] - origin[0], 2) +
      Math.pow(dest[1] - origin[1], 2) +
      Math.pow(dest[2] - origin[2], 2)
  );
  return Math.round(distance * 10) / 10;
};

module.exports = Object.assign(
  { elements, formatNumber, distanceInLY },
  bodies
);