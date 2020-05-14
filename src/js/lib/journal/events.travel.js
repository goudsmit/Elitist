// ./js/lib/journal/events.travel.js
/**
 * -------------------------
 * Api Chapter 4. Travel
 * -------------------------
 */
const ui = require('../../ui.updates');

const Docked = (line) => {
  return new Promise((resolve) => {
    Cmdr.location.docked = true;

    let station = {
      name: line.StationName,
      type: line.StationType,
      faction: line.StationFaction,
      government: line.StationGovernment_Localised,
      allegiance: line.StationAllegiance,
      services: line.StationServices,
      economy: line.StationEconomy_Localised,
      economies: line.StationEconomies,
    };
  
    let result = { callback: ui.updateDock, data: station };
    resolve(result);
  });
};

const Location = (line) => {
  return new Promise((resolve) => {

  });
};

module.exports = {
  Docked
};
