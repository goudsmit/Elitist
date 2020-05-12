// ./js/lib/events.onload.js
/**
 * -------------------------
 * Api Chapter 3. Startup
 * -------------------------
 */
const journal = require("../journal");
const getShipType = journal.getShipType;
const ui = require('../../ui.updates');

const Cargo = (line) => {
  return new Promise((resolve) => {
    if (line.Count > 0) {
      console.log(line);
    }
    resolve(true);
  });
};

const ClearSavedGame = (line) => {
  return Promise.resolve(true);
};

const Commander = (line) => {
  return new Promise((resolve) => {
    /**
     * Should only be used once, to setup a Commander
     */
    if (elitist.cmdr == null) {
      elitist.cmdr = line.Name;
      localStorage.setItem("elitist", JSON.stringify(elitist));
      elitist = JSON.parse(localStorage.elitist);
      location.reload();
    }
    resolve(true);
  });
};

const LoadGame = (line) => {
  return new Promise((resolve) => {
    if (line.Ship_Localised != "SRV Scarab") {
      let shipData = {
        type: getShipType(line.Ship),
        id: line.ShipID,
        name: line.ShipName,
        ident: line.ShipIdent,
        fuel: {
          level: line.FuelLevel,
          capacity: line.FuelCapacity,
        },
      };
      let Ship = new journal.StarShip(line.ShipID);
      Ship.Get();
      Object.assign(Ship, shipData);
      Ship.Save();
      Cmdr.ship = Ship;
    } else {
      // TODO: Capture this illustrious event
      // console.log("Not in a ship event!!!: ", line)
    }
    Cmdr.credits = line.Credits;
    let result = { callback: ui.updateGameState, data: { event: line.event } };
    resolve(result);
  });
};

const Loadout = (line) => {
  return new Promise((resolve) => {
    var shipData = {
      name: line.ShipName,
      ident: line.ShipIdent,
      type: getShipType(line.Ship),
      rebuy: line.Rebuy,
      hull: {
        health: line.HullHealth
      },
      modules: {
        installed: line.Modules,
      },
    };
    if (line.HullValue) {
      shipData.hull["value"] = line.HullValue;
    }
    if (line.ModulesValue) {
      shipData.modules.value = line.ModulesValue;
    }
    let Ship = new journal.StarShip(line.ShipID);
    Ship.Get();
    console.log(shipData)
    Object.assign(Ship, shipData);
    if (Cmdr.ship.id != Ship.id) {
      Cmdr.ship = Ship;
    } else {
      Object.assign(Cmdr.ship, Ship);
    }
    Cmdr.ship.Save();

    let result = { callback: ui.updateShip, data: Cmdr.ship };
    resolve(result);
  });
};

const Materials = (line) => {
  return new Promise((resolve) => {
    let categories = ["Raw", "Encoded", "Manufactured"];
    categories.forEach((category) => {
      for (i in line[category]) {
        let material = line[category][i];
        let materialName =
          category === "Raw" ? material.Name : material.Name_Localised;
        let Mat = new journal.Material(materialName);
        Mat.Check();
        Object.assign(Mat, {
          name: materialName,
          type: category,
          quantity: material.Count,
          cssname: material.Name,
        });
        Mat.Save();
      }
    });

    let result = { callback: ui.updateMaterials };
    resolve(result);
  });
};
const Missions = (line) => {
  return Promise.resolve(true);
};

const NewCommander = (line) => {
  console.log(line);
  return Promise.resolve(true);
};

const Passengers = (line) => {
  console.log(line);
  return Promise.resolve(true);
};

const Powerplay = (line) => {
  return Promise.resolve(true);
};

const Progress = (line) => {
  return new Promise((resolve) => {
    let RANKS = journal.RANKS;
    for (rank in RANKS) {
      db.ranks.update({ type: rank }, { progress: line[rank] });
    }

    let result = { callback: ui.updateRank };
    resolve(result);
  });
};

const Rank = (line) => {
  return new Promise((resolve) => {
    let RANKS = journal.RANKS;
    for (rank in RANKS) {
      db.ranks.update({ type: rank }, { level: line[rank] });
    }

    let result = { callback: ui.updateRank };
    resolve(result);
  });
};

const Reputation = (line) => {
  return Promise.resolve(true);
};

const Statistics = (line) => {
  return Promise.resolve(true);
};

module.exports = {
  Cargo,
  ClearSavedGame,
  Commander,
  LoadGame,
  Loadout,
  Materials,
  Missions,
  NewCommander,
  Passengers,
  Powerplay,
  Progress,
  Rank,
  Reputation,
  Statistics,
};
