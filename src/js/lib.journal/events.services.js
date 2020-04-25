// lib/events.services.js
const journal = require("../journal");

// Api manual chapter 8: Station Services
const BuyAmmo = async function BuyAmmo(line) {
  Cmdr.credits -= line.Cost
  Cmdr.Save()
};
const BuyDrones = async function BuyDrones(line) {
  Cmdr.credits -= line.TotalCost
  Cmdr.Save()
};
const CargoDepot = async function CargoDepot(line) {
  return;
};
const CommunityGoal = async function CommunityGoal(line) {
  return;
};
const CommunityGoalDiscard = async function CommunityGoalDiscard(line) {
  return;
};
const CommunityGoalJoin = async function CommunityGoalJoin(line) {
  return;
};
const CommunityGoalReward = async function CommunityGoalReward(line) {
  return;
};
const CrewAssign = async function CrewAssign(line) {
  console.log(line);
};
const CrewFire = async function CrewFire(line) {
  console.log(line);
};
const CrewHire = async function CrewHire(line) {
  console.log(line);
};
const EngineerApply = async function EngineerApply(line) {
  console.log(line);
};
const EngineerContribution = async function EngineerContribution(line) {
  return;
};
const EngineerCraft = async function EngineerCraft(line) {
  return;
};
const EngineerLegacyConvert = async function EngineerLegacyConvert(line) {
  console.log(line);
};

const EngineerProgress = async function EngineerProgress(line) {
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

const FetchRemoteModule = async function FetchRemoteModule(line) {
  Cmdr.credits -= line.TransferCost
  Cmdr.Save()
};
const Market = async function Market(line) {
  // Maybe a future plan?
  return;
};
const MassModuleStore = async function MassModuleStore(line) {
  // When I do more with ships and Loadout
  return;
};
const MaterialTrade = async function MaterialTrade(line) {
  console.log(line);
  // var materialName = (line.Name_Localised == undefined) ? line.Name : line.Name_Localised
  // let Material = new journal.Material(materialName);
  // await Material.Check().then( () => {
  //   if (Material.quantity) {
  //       Material.quantity += line.Count;
  //     } else {
  //       Material.quantity = line.Count;
  //     }
  //     Material.type = line.Category;
  //     Material.cssname = line.Name;
  //     Material.Save();
  //   }
  // );
};
const MissionAbandoned = async function MissionAbandoned(line) {
  return;
};
const MissionAccepted = async function MissionAccepted(line) {
  return;
};
const MissionCompleted = async function MissionCompleted(line) {
  return;
};
const MissionFailed = async function MissionFailed(line) {
  return;
};
const MissionRedirected = async function MissionRedirected(line) {
  return;
};
const ModuleBuy = async function ModuleBuy(line) {
  Cmdr.credits -= line.BuyPrice
  Cmdr.Save()
};
const ModuleRetrieve = async function ModuleRetrieve(line) {
  return;
};
const ModuleSell = async function ModuleSell(line) {
  Cmdr.credits += line.SellPrice
  Cmdr.Save()
};
const ModuleSellRemote = async function ModuleSellRemote(line) {
  Cmdr.credits += line.SellPrice
  Cmdr.Save()
};
const ModuleStore = async function ModuleStore(line) {
  return;
};
const ModuleSwap = async function ModuleSwap(line) {
  return;
};
const Outfitting = async function Outfitting(line) {
  return;
};
const PayBounties = async function PayBounties(line) {
  Cmdr.credits -= line.Amount
  Cmdr.Save()
};
const PayFines = async function PayFines(line) {
  Cmdr.credits -= line.Amount
  Cmdr.Save()
};
const PayLegacyFines = async function PayLegacyFines(line) {
  console.log(line);
};
const RedeemVoucher = async function RedeemVoucher(line) {
  Cmdr.credits += line.Amount
  Cmdr.Save()
  // Could add a log Message here
};
const RefuelAll = async function RefuelAll(line) {
  Cmdr.credits -= line.Cost
  Cmdr.Save()
};
const RefuelPartial = async function RefuelPartial(line) {
  console.log(line);
};
const Repair = async function Repair(line) {
  Cmdr.credits -= line.Cost
  Cmdr.Save()
};
const RepairAll = async function RepairAll(line) {
  Cmdr.credits -= line.Cost
  Cmdr.Save()
};
const RestockVehicle = async function RestockVehicle(line) {
  console.log(line);
};
const ScientificResearch = async function ScientificResearch(line) {
  console.log(line);
};
const SearchAndRescue = async function SearchAndRescue(line) {
  console.log(line);
};
const SellDrones = async function SellDrones(line) {
  Cmdr.credits -= line.TotalSale
  Cmdr.Save()
};
const SellShipOnRebuy = async function SellShipOnRebuy(line) {
  console.log(line);
};
const SetUserShipName = async function SetUserShipName(line) {
  Cmdr.ship.name = line.UserShipName
  Cmdr.ship.ident = line.UserShipId
  Cmdr.Save()
};
const Shipyard = async function Shipyard(line) {
  return;
};
const ShipyardBuy = async function ShipyardBuy(line) {
  Cmdr.credits -= line.ShipPrice
  Cmdr.Save()
};
const ShipyardNew = async function ShipyardNew(line) {
  let newShip = {
    name: "New",
    ident: "-",
    id: line.NewShipID,
    type: (line.ShipType_Localised == undefined) ? line.ShipType : line.ShipType_Localised,
    fuel: {
      level: 0,
      capacity: 0
    }    
  }
  Cmdr.ship = newShip
  Cmdr.Save()
};
const ShipyardSell = async function ShipyardSell(line) {
  await db.ships.get({id: line.SellShipID}).then( ship => {
    if (ship) {
      ship.id += 1000
      ship.sold = true
      db.ships.put(ship)
      db.ships.delete(line.SellShipID)
    }
  })
};
const ShipyardSwap = async function ShipyardSwap(line) {
  await db.ships.get({id: line.ShipID}).then( ship => {
    if (ship) {
      Cmdr.ship = ship
      Cmdr.Save()
    }
  })
};
const ShipyardTransfer = async function ShipyardTransfer(line) {
  Cmdr.credits -= line.TransferPrice
  Cmdr.Save()

  let transfer = {
    shipid: line.ShipID,
    from: line.System,
    distance: line.Distance,
    time: line.TransferTime
  }
  let result = { callback: updateToast, data: transfer}
  return Promise.resolve(result)
};
const StoredModules = async function StoredModules(line) {
  return;
};
const StoredShips = async function StoredShips(line) {
  // When written: when visiting shipyard
  // TODO: Future Feature - Ships Section
  return; 
};
const TechnologyBroker = async function TechnologyBroker(line) {
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
