// ./js/lib/events.onload.js

/**
 * -------------------------
 * Api Chapter 3. Startup
 * -------------------------
 */
const journal = require("../journal");
const getShipType = journal.getShipType;
const interface = require('../interface')

const Cargo = (line) => {
  return new Promise((resolve) => {
    if (line.Count > 0) {
      // console.log(line);
    }
    let result = {callback: interface.updateCargo, data: Object.assign({}, line)}
    resolve(result);
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
  /** 
   * TODO: Very rare bug found 
   * if you log out in the middle of a jump, the travel screen doesnt disappear
   * Accomodate for that in here if you can...
   */
  return new Promise(async(resolve) => {
    if (line.Ship_Localised != "SRV Scarab") {
      let shipData = {
        name: line.ShipName,
        ident: line.ShipIdent,
        type: getShipType(line.Ship),
        rebuy:
          line.Rebuy != undefined
            ? line.Rebuy
            : Cmdr.ship.rebuy != undefined
            ? Cmdr.ship.rebuy
            : 0,
        hull: {
          value:
            line.HullValue != undefined
              ? line.HullValue
              : Cmdr.ship.hull && Cmdr.ship.hull.value != undefined
              ? Cmdr.ship.hull.value
              : 0,
          health:
            line.HullHealth != undefined
              ? line.HullHealth
              : Cmdr.ship.hull && Cmdr.ship.hull.health != undefined
              ? Cmdr.ship.hull.health
              : "-",
        },
        modules: {
          installed: line.Modules,
          value:
            line.ModulesValue != undefined
              ? line.ModulesValue
              : Cmdr.ship.hull && Cmdr.ship.modules.value != undefined
              ? Cmdr.ship.modules.value
              : 0,
        },
        fuel: {
          level: line.FuelLevel,
          capacity: line.FuelCapacity,
        },
      };
      let Ship = new journal.StarShip(line.ShipID);
      await Ship.Get().then(() => {
        Object.assign(Ship, shipData);
        Ship.Save();
        Cmdr.ship = Ship;
      })
    } else {
      // TODO: Capture this illustrious event
      console.log("Not in a ship event!!!: ", line)
    }
    Cmdr.credits = line.Credits;
    let result = { callback: interface.setGameState, data: Object.assign({}, line) };
    resolve(result);
  });
};

const Loadout = (line) => {
  return new Promise(async(resolve) => {
    let loadOut = {
      name: line.ShipName,
      ident: line.ShipIdent,
      type: getShipType(line.Ship),
      rebuy: line.Rebuy,
      hull: {
        value:
          line.HullValue != undefined  ? line.HullValue
            : Cmdr.ship.hull.value != undefined
            ? Cmdr.ship.hull.value
            : 0,
        health: line.HullHealth,
      },
      modules: {
        installed: line.Modules,
        value:
          line.ModulesValue != undefined
            ? line.ModulesValue
            : Cmdr.ship.modules.value != undefined
            ? Cmdr.ship.modules.value
            : 0,
      },
    };
    let Ship = new journal.StarShip(line.ShipID);
    await Ship.Get().then( () => {
      Object.assign(Ship, loadOut);
      if (Cmdr.ship.id != Ship.id) {
        Cmdr.ship = Ship;
      } else {
        Object.assign(Cmdr.ship, Ship);
      }
      Cmdr.ship.Save();
    })

    let result = { callback: interface.updateShip, data: Cmdr.ship };
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

    let result = { callback: interface.updateMaterials };
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
  // console.log(line);
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

    let result = { callback: interface.updateRanks };
    resolve(result);
  });
};

const Rank = (line) => {
  return new Promise((resolve) => {
    let RANKS = journal.RANKS;
    for (rank in RANKS) {
      db.ranks.update({ type: rank }, { level: line[rank] });
    }

    let result = { callback: interface.updateRanks };
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
