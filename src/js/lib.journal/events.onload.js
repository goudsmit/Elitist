// ./js/lib/events.onload.js
const journal = require("../journal");

const Cargo = function  Cargo(line) {
  // if (line.Count > 0) {
  //   console.log("Need to get more of these to determine how to handle", line);
  // }
  return;
};
const ClearSavedGame = function  ClearSavedGame(line) {
  console.log(line);
};
const Commander = function  Commander(line) {
  /**
   * Should only be used once, to setup a Commander
   */
  if (elitist.cmdr == null) {
    elitist.cmdr = line.Name
    localStorage.setItem('elitist', JSON.stringify(elitist))
    elitist = JSON.parse(localStorage.elitist)
    location.reload();
  }
};

const LoadGame = function  LoadGame(line) {
  if (line.Ship_Localised != "SRV Scarab") {
    let ship = {
      type: (line.Ship_Localised == undefined) ? line.Ship : line.Ship_Localised,
      id: line.ShipID,
      name: line.ShipName,
      ident: line.ShipIdent,
      fuel: {
        level: line.FuelLevel,
        capacity: line.FuelCapacity,
      },
    };
    Cmdr.ship = ship;
  }
  Cmdr.credits = line.Credits;
  Cmdr.Save();

  let result = { callback: updateGameState, data: {event: line.event} };
  return Promise.resolve(result);
};

const Loadout = function  Loadout(line) {
  // Add ship
  db.ships.add({ id: line.ShipID}).catch( () => {} )

  let ship = {
    name: line.ShipName,
    ident: line.ShipIdent,
    id: line.ShipID,
    type: line.Ship,
    rebuy: line.Rebuy,
    hull: {
      value: line.HullValue,
      health: line.HullHealth
    },
    modules: {
      value: line.ModulesValue,
      installed: line.Modules
    }
  }
  

  Cmdr.ship = {...Cmdr.ship, ...ship}
  console.log("Loadout>Presave :", Cmdr.ship)
  Cmdr.Save()

  let result = { callback: updateShip}
  return Promise.resolve(result);
};

const Materials = function  Materials(line) {
  let categories = ["Raw", "Encoded", "Manufactured"]
  categories.forEach(category => {
    for (i in line[category]) {
      let material = line[category][i]
      let materialName = (category === "Raw") ? material.Name : material.Name_Localised;
      db.materials.put({ name: materialName, type: category, quantity: material.Count, cssname: material.Name })
    }
  })

  let result = {callback: updateMaterials}
  return Promise.resolve(result)
};

const Missions = function  Missions(line) {
  return;
};
const NewCommander = function  NewCommander(line) {
  console.log(line);
};

const Passengers = function  Passengers(line) {
  let result = { callback: updatePassengers, data: line.Mainfest}
  return Promise.resolve(result);
};
const PowerPlay = function  PowerPlay(line) {
  console.log(line);
};

const Progress = function  Progress(line) {
  let RANKS = journal.RANKS;
  for (rank in RANKS) {
    db.ranks.update({ type: rank }, { progress: line[rank] });
  }

  let result = { callback: updateRank };
  return Promise.resolve(result);
};

const Rank = function  Rank(line) {
  let RANKS = journal.RANKS;
  for (rank in RANKS) {
    db.ranks.update({ type: rank }, { level: line[rank] });
  }

  let result = { callback: updateRank };
  return Promise.resolve(result);
};

const Reputation = function  Reputation(line) {
  return;
};
const Statistics = function  Statistics(line) {
  return;
};

module.exports = {
  Cargo,
  Commander,
  LoadGame,
  Loadout,
  Materials,
  Missions,
  Passengers,
  Progress,
  Rank,
  Reputation,
  Statistics
};
