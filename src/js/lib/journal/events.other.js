// ./js/lib/journal/events.other.js
/**
 * -------------------------
 * Api Chapter 11. Other Events
 * -------------------------
 */
const ui = require("../../ui.updates");
const interface = require('../interface');
const journal = require('../journal')

const ApproachSettlement = (line) => {
  return new Promise((resolve) => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    return Promise.resolve(result);  
    resolve(result);
  });
};
const CommitCrime = (line) => {
  let result = {callback: interface.updateLog, data: Object.assign({}, line)}
  return Promise.resolve(result);  
}
const DataScanned = (line) => Promise.resolve(true);
const Friends = (line) => {
  return new Promise((resolve) => {
    let result = { callback: interface.updateLog, data: Object.assign({}, line) };
    resolve(result);
  });
};
const FuelScoop = (line) => {
  let result = {callback: interface.updateLog, data: Object.assign({}, line)}
  return Promise.resolve(result);
};
const LaunchDrone = (line) => Promise.resolve(true)
const ModuleInfo = (line) => Promise.resolve(true)
const Music = (line) => Promise.resolve(true) 
const PayFines = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.Amount
    let result = { callback: interface.updateLog, data: Object.assign({}, line) };
    resolve(result);
  })
}
const Promotion = (line) => {
  return new Promise(resolve => {
    for (rank in journal.RANKS) {
      if (line.hasOwnProperty(rank)) {
        db.ranks.update({ type: rank }, { level: line[rank], progress: 0 })
      }
    }
    interface.updateLog(Object.assign({}, line))
    let result = {callback: interface.updateRanks, data: Object.assign({}, line)}
    resolve(result)    
  })
}
const ReceiveText = (line) => {
  // TODO: toasts? Or Session! Wing messages might be interesting...
  return Promise.resolve(true);
};
const Resurrect = (line) => {
  return new Promise(resolve => {
    // TODO: Please don't use this when you get bankrupt.. Thats complicated. :P
    Cmdr.ship.hull.health = 1
    Cmdr.credits -= line.Cost
    let result = { callback: interface.updateLog, data: Object.assign({}, line) };
    resolve(result)
  })  
}
const Scanned = (line) => {
  return new Promise((resolve) => {
    let result = { callback: interface.updateLog, data: Object.assign({}, line) };
    resolve(result);
  });
};
const SendText = (line) => {
  // TODO: toasts? Or Session! Wing messages might be interesting...
  return Promise.resolve(true); 
}
const Shutdown = (line) => {
  // TODO: Port to Interface logic
  return new Promise((resolve) => {
    let session
    if (elitist.cmdr) {
      session = Cmdr.session
      Cmdr.session = {materials: {}, bounties: 0}
      Cmdr.Save();
    }
    db.logs.update(fileName, { shutdown: true });
    lineSeq = 0;
    let result = { callback: interface.setGameState, data: Object.assign({}, line, session) };
    resolve(result);
  });
};
const USSDrop = (line) => Promise.resolve(true);

module.exports = {
  ApproachSettlement,
  CommitCrime,
  DataScanned,
  Friends,
  FuelScoop,
  LaunchDrone,
  ModuleInfo,
  Music,
  PayFines,
  Promotion,
  ReceiveText,
  Resurrect,
  Scanned,
  SendText,
  Shutdown,
  USSDrop
};
