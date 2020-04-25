// ./js/lib/events.onload.js
const journal = require("../journal");

const Cargo = async function Cargo(line) {
  // if (line.Count > 0) {
  //   console.log("Need to get more of these to determine how to handle", line);
  // }
  return;
};
const ClearSavedGame = async function ClearSavedGame(line) {
  console.log(line);
};
const Commander = async function Commander(line) {
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

const LoadGame = async function LoadGame(line) {
  let ship = {
    type: line.Ship,
    id: line.ShipID,
    name: line.ShipName,
    ident: line.ShipIdent,
    fuel: {
      level: line.FuelLevel,
      capacity: line.FuelCapacity,
    },
  };
  Cmdr.ship = ship;
  Cmdr.credits = line.Credits;
  Cmdr.Save();

  let result = { callback: updateCmdr };
  return Promise.resolve(result);
};

const Loadout = async function Loadout(line) {
  // Add ship
  db.ships.add({ id: line.ShipID}).catch( () => {} )

  let ship = {
    name: line.ShipName,
    ident: line.ShipIdent,
    id: line.ShipID,
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
  Cmdr.Save()

  let result = { callback: updateShip}
  return Promise.resolve(result);
};

const Materials = async function Materials(line) {
  let categories = ["Raw", "Encoded", "Manufactured"]
  await categories.forEach(category => {
    for (i in line[category]) {
      let material = line[category][i]
      let materialName = (category === "Raw") ? material.Name : material.Name_Localised;
      db.materials.put({ name: materialName, type: category, quantity: material.Count, cssname: material.Name })
    }
  })

  let result = {callback: updateMaterials}
  return Promise.resolve(result)
};

const Missions = async function Missions(line) {
  return;
};
const NewCommander = async function NewCommander(line) {
  console.log(line);
};

const Passengers = async function Passengers(line) {
  let result = { callback: updatePassengers, data: line.Mainfest}
  return Promise.resolve(result);
};
const PowerPlay = async function PowerPlay(line) {
  console.log(line);
};

const Progress = async function Progress(line) {
  let RANKS = journal.RANKS;
  for (rank in RANKS) {
    db.ranks.update({ type: rank }, { progress: line[rank] });
  }

  let result = { callback: updateRank };
  return Promise.resolve(result);
};

const Rank = async function Rank(line) {
  let RANKS = journal.RANKS;
  for (rank in RANKS) {
    db.ranks.update({ type: rank }, { level: line[rank] });
  }

  let result = { callback: updateRank };
  return Promise.resolve(result);
};

const Reputation = async function Reputation(line) {
  return;
};
const Statistics = async function Statistics(line) {
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
