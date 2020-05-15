// ./js/lib/journal/events.exploration.js
/**
 * -------------------------
 * Api Chapter 6. Exploration
 * -------------------------
 */
const ui = require('../../ui.updates');

const FSSSignalDiscovered = (line) => {
  return new Promise((resolve) => {
    let signal = {
      name: line.SignalName,
      state: line.SpawningState,
      faction: line.SpawningFaction,
      time: line.TimeRemaining,
      address: line.SystemAddress,
      threatlevel: line.ThreatLevel,
      usstype: line.USSType,
      station: line.IsStation,
    };

    let result = { callback: ui.updateSignals, data: signal };
    resolve(result);
  });
};

module.exports = {
  FSSSignalDiscovered
}