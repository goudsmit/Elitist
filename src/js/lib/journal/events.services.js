// ./js/lib/journal/events.services.js
/**
 * -------------------------
 * Api Chapter 8. Station Services
 * -------------------------
 */
const ui = require('../../ui.updates');
const interface = require('../interface');

const BuyAmmo = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.Cost
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const CargoDepot = (line) => Promise.resolve(true)
const CommunityGoal = (line) => Promise.resolve(true)
const CommunityGoalDiscard = (line) => Promise.resolve(true)
const CommunityGoalJoin = (line) => Promise.resolve(true)
const CommunityGoalReward = (line) => Promise.resolve(true)

const EngineerProgress = (line) => {
  return new Promise(resolve => {
    if (line.Engineers) {
      line.Engineers.forEach(async (engineer) => {
        db.engineers
          .get({ id: engineer.EngineerID }, async (e) => {
            if (e == undefined) {
              db.engineers
                .add({ id: engineer.EngineerID, name: engineer.Engineer })
                .catch((error) => {});
            }
          })
          .then(() => {
            db.engineers.update(
              { id: engineer.EngineerID },
              { progress: engineer.Progress }
            );
            if (engineer.Progress == "Unlocked") {
              db.engineers.update(
                { id: engineer.EngineerID },
                { rankprogress: engineer.RankProgress, rank: engineer.Rank }
              );
            }
          });
      });
    } else {
      db.engineers
        .get({ id: line.EngineerID }, async (e) => {
          if (e == undefined) {
            db.engineers
              .add({ id: line.EngineerID, name: line.Engineer })
              .catch((error) => {});
          }
        })
        .then(() => {
          db.engineers.update(
            { id: line.EngineerID },
            { progress: line.Progress }
          );
          if (line.Progress == "Unlocked") {
            db.engineers.update(
              { id: line.EngineerID },
              { rankprogress: line.RankProgress, rank: line.Rank }
            );
          }
        });
    }
    resolve(true)
  })
}

const Market = (line) => Promise.resolve(true);
const MassModuleStore = (line) => Promise.resolve(true);
// TODO: Sure I could do something with this..
const MissionAbandoned = (line) => Promise.resolve(true);
const MissionAccepted = (line) => Promise.resolve(true);
const MissionCompleted = (line) => Promise.resolve(true);
const MissionFailed = (line) => Promise.resolve(true);
const MissionRedirected = (line) => Promise.resolve(true);

const ModuleBuy = (line) => {
  return new Promise(resolve => {
    let realCosts = line.SellPrice == undefined ? line.BuyPrice : line.BuyPrice-line.SellPrice
    Cmdr.credits -= realCosts
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result);
  })
}
const ModuleRetrieve = (line) => {
  return new Promise(resolve => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result);
  })  
}
const Outfitting = (line) => Promise.resolve(true);
const RedeemVoucher = (line) => {
  return new Promise(resolve => {
    Cmdr.credits =+ line.Amount
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const RefuelAll = (line) => {
  return new Promise(resolve => {
    // TODO: Change into updateLog + setFuel.
    // intrface.elements.cmdrCredits.innerText -= line.Cost
    Cmdr.credits -= line.Cost
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const Repair = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.Cost
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result);
  })
}
const RepairAll = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.Cost
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result);
  })
}
const SetUserShipName = (line) => {
  return new Promise(resolve => {
    Cmdr.ship.name = line.UserShipName
    Cmdr.ship.ident = line.UserShipId
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const Shipyard = (line) => Promise.resolve(true);
const ShipyardBuy = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.ShipPrice
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const ShipyardNew = (line) => {
  return new Promise((resolve) => {
    const getShipType = require("./index").getShipType;
    let newShip = {
      name: "ohreally",
      ident: "0x0",
      type: getShipType(line.ShipType),
      fuel: {
        level: 0,
        capacity: 0,
      },
      hull: {
        value: 0,
        modules: [],
      },
      rebuy: 0,
    };
    let Ship = new journal.StarShip(line.NewShipID)
    Object.assign(Ship, newShip)
    Ship.Save()
    Cmdr.ship = Ship

    let result = {callback: interface.updateShip, data: Ship}
    resolve(result);
  });
};
const StoredModules = (line) => Promise.resolve(true);
const StoredShips = (line) => {
  console.log(line)
  return Promise.resolve(true)
}
// MAYBE IN THE FUTURE
const WingAdd = (line) => Promise.resolve(true)
const WingInvite = (line) => Promise.resolve(true)
const WingJoin = (line) => Promise.resolve(true)
const WingLeave = (line) => Promise.resolve(true)


module.exports = {
  BuyAmmo,
  CargoDepot,
  CommunityGoal,
  CommunityGoalDiscard,
  CommunityGoalJoin,
  CommunityGoalReward,
  EngineerProgress,
  Market,
  MassModuleStore,
  MissionAbandoned,
  MissionAccepted,
  MissionCompleted,
  MissionFailed,
  MissionRedirected,
  ModuleBuy,
  ModuleRetrieve,
  Outfitting,
  RedeemVoucher,
  RefuelAll,
  Repair,
  RepairAll,
  SetUserShipName,
  Shipyard,
  ShipyardBuy,
  ShipyardNew,
  StoredModules,
  StoredShips,
  WingAdd,
  WingInvite,
  WingJoin,
  WingLeave
}