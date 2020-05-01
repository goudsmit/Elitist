// lib/events.services.js
const journal = require("../journal");
const getShipType = journal.getShipType

// Api manual chapter 8: Station Services
const BuyAmmo = function BuyAmmo(line) {
  Cmdr.credits -= line.Cost
};
const BuyDrones = function BuyDrones(line) {
  Cmdr.credits -= line.TotalCost
};
const CargoDepot = function CargoDepot(line) {
  return;
};
const CommunityGoal = function CommunityGoal(line) {
  return;
};
const CommunityGoalDiscard = function CommunityGoalDiscard(line) {
  return;
};
const CommunityGoalJoin = function CommunityGoalJoin(line) {
  return;
};
const CommunityGoalReward = function CommunityGoalReward(line) {
  return;
};
const CrewAssign = function CrewAssign(line) {
  console.log(line);
};
const CrewFire = function CrewFire(line) {
  console.log(line);
};
const CrewHire = function CrewHire(line) {
  console.log(line);
};
const EngineerApply = function EngineerApply(line) {
  console.log(line);
};
const EngineerContribution = function EngineerContribution(line) {
  return;
};
const EngineerCraft = function EngineerCraft(line) {
  return;
};
const EngineerLegacyConvert = function EngineerLegacyConvert(line) {
  console.log(line);
};

const EngineerProgress = function EngineerProgress(line) {
  // Sometimes the update only involves 1 engineer, making 'Engineers' not exist.
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
};

const FetchRemoteModule = function FetchRemoteModule(line) {
  Cmdr.credits -= line.TransferCost
};
const Market = function Market(line) {
  // Maybe a future plan?
  return;
};
const MassModuleStore = function MassModuleStore(line) {
  // When I do more with ships and Loadout
  return;
};
const MaterialTrade = function MaterialTrade(line) {
  for (const property in line) {
    if (property == "Paid" || property == "Received") {
      let materialName =
        line[property].Material_Localised == undefined
          ? line[property].Material
          : line[property].Material_Localised;
      let Material = new journal.Material(materialName);
      Material.Check().then(() => {
        if (property == "Paid") {
          Material.quantity -= line[property].Count;
        } else {
          Material.quantity += line[property].Count;
        }
        Material.type = line[property].Category;
        Material.cssname = line[property].Name;
        console.log("MaterialTrade: ", materialName, Material.quantity, line[property].Count)
        Material.Save();
      });
    }
  }

  let result = {callback: updateMaterials}
  return Promise.resolve(result)
};
const MissionAbandoned = function MissionAbandoned(line) {
  return;
};
const MissionAccepted = function MissionAccepted(line) {
  return;
};
const MissionCompleted = function MissionCompleted(line) {
  return;
};
const MissionFailed = function MissionFailed(line) {
  return;
};
const MissionRedirected = function MissionRedirected(line) {
  return;
};
const ModuleBuy = function ModuleBuy(line) {
  Cmdr.credits -= line.BuyPrice
};
const ModuleRetrieve = function ModuleRetrieve(line) {
  return;
};
const ModuleSell = function ModuleSell(line) {
  Cmdr.credits += line.SellPrice
};
const ModuleSellRemote = function ModuleSellRemote(line) {
  Cmdr.credits += line.SellPrice
};
const ModuleStore = function ModuleStore(line) {
  return;
};
const ModuleSwap = function ModuleSwap(line) {
  return;
};
const Outfitting = function Outfitting(line) {
  return;
};
const PayBounties = function PayBounties(line) {
  Cmdr.credits -= line.Amount
};
const PayFines = function PayFines(line) {
  Cmdr.credits -= line.Amount
};
const PayLegacyFines = function PayLegacyFines(line) {
  console.log(line);
};
const RedeemVoucher = function RedeemVoucher(line) {
  Cmdr.credits += line.Amount
};
const RefuelAll = function RefuelAll(line) {
  Cmdr.credits -= line.Cost
};
const RefuelPartial = function RefuelPartial(line) {
  console.log(line);
};
const Repair = function Repair(line) {
  Cmdr.credits -= line.Cost
};
const RepairAll = function RepairAll(line) {
  Cmdr.credits -= line.Cost
};
const RestockVehicle = function RestockVehicle(line) {
  console.log(line);
};
const ScientificResearch = function ScientificResearch(line) {
  console.log(line);
};
const SearchAndRescue = function SearchAndRescue(line) {
  console.log(line);
};
const SellDrones = function SellDrones(line) {
  Cmdr.credits -= line.TotalSale
};
const SellShipOnRebuy = function SellShipOnRebuy(line) {
  console.log(line);
};
const SetUserShipName = function SetUserShipName(line) {
  Cmdr.ship.name = line.UserShipName
  Cmdr.ship.ident = line.UserShipId
  Cmdr.ship.Save()
};
const Shipyard = function Shipyard(line) {
  return;
};
const ShipyardBuy = function ShipyardBuy(line) {
  Cmdr.credits -= line.ShipPrice
};
const ShipyardNew = function ShipyardNew(line) {
  let shipData = {
    name: "unknown",
    ident: "no",
    type: getShipType(line.ShipType),
    fuel: {
      level: 0,
      capacity: 0,
    },
    hull: {
      value: 0,
      modules: [],
    },
    rebuy: 0
  }
  let Ship = new journal.StarShip(line.NewShipID)
  Object.assign(Ship, shipData)
  Ship.Save()
  Cmdr.ship = Ship

  let result = { callback: updateShip}
  return Promise.resolve(result)
};
const ShipyardSell = function ShipyardSell(line) {
  // TODO: Perhaps port to use StarShip Class, but his works fine
  db.ships.get({id: line.SellShipID}).then( ship => {
    if (ship) {
      ship.id += 1000
      ship.sold = true
      db.ships.put(ship)
      db.ships.delete(line.SellShipID)
    }
  })
};
const ShipyardSwap = function ShipyardSwap(line) {
  let Ship = new journal.StarShip(line.ShipID)
  Ship.Get()
  Cmdr.ship = Ship

  let result = { callback: updateShip}
  return Promise.resolve(result)
};
const ShipyardTransfer = function ShipyardTransfer(line) {
  Cmdr.credits -= line.TransferPrice

  let transfer = {
    shipid: line.ShipID,
    from: line.System,
    distance: line.Distance,
    time: line.TransferTime
  }
  let result = { callback: updateToast, data: transfer}
  return Promise.resolve(result)
};
const StoredModules = function StoredModules(line) {
  return;
};
const StoredShips = function StoredShips(line) {
  // When written: when visiting shipyard
  // TODO: Future Feature - Ships Section
  if (line.ShipsHere.length > 0) {
    line.ShipsHere.forEach( ship => {
      let Ship = new journal.StarShip(ship.ShipID)
      Ship.Get()
      let shipData = {
        name: ship.Name,
        type: getShipType(ship.ShipType), 
        hull: { 
          value: ship.Value
        }
      }
      Object.assign(Ship, shipData)
      Ship.Save()
    })
  };
  // return; 
};
const TechnologyBroker = function TechnologyBroker(line) {
  console.log(line);
};

module.exports = {
  BuyAmmo,
  BuyDrones,
  CargoDepot,
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
  PayFines,
  RedeemVoucher,
  RefuelAll,
  Repair,
  RepairAll,
  SellDrones,
  SetUserShipName,
  Shipyard,
  ShipyardBuy,
  ShipyardNew,
  ShipyardSell,
  ShipyardSwap,
  ShipyardTransfer,
  StoredModules,
  StoredShips
};
