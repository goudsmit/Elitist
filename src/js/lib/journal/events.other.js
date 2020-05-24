// ./js/lib/journal/events.other.js
/**
 * -------------------------
 * Api Chapter 11. Other Events
 * -------------------------
 */
const ui = require("../../ui.updates");

const ApproachSettlement = (line) => {
  return new Promise((resolve) => {
    let result = {
      callback: ui.updateLog,
      data: { event: line.event, settlement: line.Name },
    };
    resolve(result);
  });
};
const Friends = (line) => {
  return new Promise((resolve) => {
    let result = { callback: ui.updateLog, data: Object.assign({}, line) };
    resolve(result);
  });
};
const FuelScoop = (line) => {
  result = { callback: ui.updateFuel, data: Object.assign({}, line) };
  return Promise.resolve(result);
};
const ModuleInfo = (line) => Promise.resolve(true)
const Music = (line) => {
  return Promise.resolve(true);
};
const ReceiveText = (line) => {
  // console.log(line)
  // TODO: toasts?
  return Promise.resolve(true);
};
const Scanned = (line) => {
  return new Promise((resolve) => {
    let result = { callback: ui.updateLog, data: Object.assign({}, line) };
    resolve(result);
  });
};
const Shutdown = (line) => {
  return new Promise((resolve) => {
    if (elitist.cmdr) {
      Cmdr.Save();
    }
    db.logs.update(fileName, { shutdown: true });
    lineSeq = 0;
    let result = { callback: ui.updateGameState, data: { event: line.event } };
    resolve(result);
  });
};
module.exports = {
  ApproachSettlement,
  Friends,
  FuelScoop,
  ModuleInfo,
  Music,
  ReceiveText,
  Scanned,
  Shutdown,
};
