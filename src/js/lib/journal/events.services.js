// ./js/lib/journal/events.services.js
/**
 * -------------------------
 * Api Chapter 8. Station Services
 * -------------------------
 */
const interface = require('../interface');

const BuyAmmo = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.Cost
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const BuyDrones = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.TotalCost
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const CargoDepot = (line) => Promise.resolve(true)
const CrewAssign = (line) => {
  return new Promise(resolve => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })  
}
const CrewHire = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.Cost
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const CommunityGoal = (line) => Promise.resolve(true)
const CommunityGoalDiscard = (line) => Promise.resolve(true)
const CommunityGoalJoin = (line) => Promise.resolve(true)
const CommunityGoalReward = (line) => Promise.resolve(true)
const EngineerContribution = (line) => {
  return new Promise(resolve => {
    console.info(line)
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result); 
  })
}
const EngineerCraft = (line) => {
  // TODO: Add blueprints.
  // console.info(line)
  return Promise.resolve(true)
}
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
const FetchRemoteModule = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.TransferCost
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)  
  })
}
const Market = (line) => Promise.resolve(true);
const MassModuleStore = (line) => Promise.resolve(true);
const MaterialTrade = (line) => {
  for (let transaction of ["Paid", "Received"]) {
    let materialName = line.Material_Localised ? line.Material_Localised : line.Material
    let Material = new journal.Material(materialName)
    Material.Check().then( () => {
      if (transaction == "Paid") {
        Material.quantity -= line["Paid"].Quantity
      } else {
        Material.quantity += line["Received"].Quantity
        Material.cssname = line.Material
        Material.type = line.Category
      }
      Material.Save()
    })
  }
  // let result = {callback: interface.updateLog, data: Object.assign({}, line)}
  return Promise.resolve(true)  
}
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
const ModuleSell = (line) => {
  return new Promise(resolve => {
    Cmdr.credits += line.SellPrice
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result);
  })  
}
const ModuleSellRemote = (line) => {
  return new Promise(resolve => {
    Cmdr.credits += line.SellPrice
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result);
  })  
}
const ModuleStore = (line) => Promise.resolve(true);
const ModuleSwap = (line) => Promise.resolve(true);
const Outfitting = (line) => Promise.resolve(true);
const RedeemVoucher = (line) => {
  return new Promise(resolve => {
    Cmdr.credits += line.Amount
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const PayBounties = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.Amount
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
const RestockVehicle = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.Cost
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result);
  })  
}
const SellDrones = (line) => {
  return new Promise(resolve => {
    Cmdr.credits += line.TotalSale
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
const ShipyardSell = (line) => {
  return new Promise(resolve => {
    Cmdr.credits =+ line.ShipPrice
    // TODO: Perhaps port to use StarShip Class, but his works fine
    db.ships.get({id: line.SellShipID}).then( ship => {
      if (ship) {
        ship.id += 1000
        ship.sold = true
        db.ships.put(ship)
        db.ships.delete(line.SellShipID)
      }
    }).then( () => {
      let result = {callback: interface.updateLog, data: Object.assign({}, line)}
      resolve(result)
    })
  })
}
const ShipyardSwap = (line) => {
  return new Promise(resolve => {
    let Ship = new journal.StarShip(line.ShipID)
    Ship.Get().then( () => {
      Cmdr.ship = Ship
      interface.updateLog(line);
    }).then(() => {
      let result = {callback: interface.updateShip, data: Ship}
      resolve(result);
    })
  })
}
const ShipyardTransfer = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.TransferPrice
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const StoredModules = (line) => Promise.resolve(true);
const StoredShips = (line) => {
  // TODO: Maybe a way to get ships people have, but no log files.
  // console.log(line)
  return Promise.resolve(true)
}
// MAYBE IN THE FUTURE
const WingAdd = (line) => Promise.resolve(true)
const WingInvite = (line) => Promise.resolve(true)
const WingJoin = (line) => Promise.resolve(true)
const WingLeave = (line) => Promise.resolve(true)


module.exports = {
  BuyAmmo,
  BuyDrones,
  CargoDepot,
  CrewAssign,
  CrewHire,
  CommunityGoal,
  CommunityGoalDiscard,
  CommunityGoalJoin,
  CommunityGoalReward,
  EngineerContribution,
  EngineerCraft,
  EngineerProgress,
  FetchRemoteModule,
  Market,
  MassModuleStore,
  MaterialTrade,
  MissionAbandoned,
  MissionAccepted,
  MissionCompleted,
  MissionFailed,
  MissionRedirected,
  ModuleBuy,
  ModuleRetrieve,
  ModuleSell,
  ModuleSellRemote,
  ModuleStore,
  ModuleSwap,
  Outfitting,
  PayBounties,
  RedeemVoucher,
  RefuelAll,
  Repair,
  RepairAll,
  RestockVehicle,
  SellDrones,
  SetUserShipName,
  Shipyard,
  ShipyardBuy,
  ShipyardNew,
  ShipyardSell,
  ShipyardSwap,
  ShipyardTransfer,
  StoredModules,
  StoredShips,
  WingAdd,
  WingInvite,
  WingJoin,
  WingLeave
}