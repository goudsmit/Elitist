/**
 * ----------------------------------
 * Elitist: Cmdr Class
 * ----------------------------------
 */
class Cmdr {
  constructor(name) {
    this.name = name;
    this.location = {};
    this.ship = {};
  }
  Init() {
    db.cmdr.add({name: this.name}).catch( () => {})
  }
  Save() {
    this.Init()
    db.cmdr.update({name: this.name}, this).then(
      db.ships.update({ id: this.ship.id}, this.ship)
    )
    updateCmdr()
  }
  async ShipDestroy(id) {
    await db.ships.get({id: id}).then( ship => {
      if (ship != undefined) {
        if (ship.destroyed != undefined) {
          ship.destroyed = ship.destroyed + 1
        } else {
          ship.destroyed = 1
        }
        db.ships.update({ id: ship.id}, {destroyed: ship.destroyed})
      }
    })
  }
}
exports.Cmdr = Cmdr;

/**
 * ----------------------------------
 * Elitist: System Class
 * ----------------------------------
 */
class System {
  constructor(address) {
    this.address = address;
  }
  Init() {
    db.systems.add({ address: this.address }).catch(() => {});
  }
  Save() {
    this.Init()
    db.systems.update({address: this.address}, this)
  }
}
exports.System = System;

/**
 * ----------------------------------
 * Elitist: Body Class extends System
 * ----------------------------------
 */
class Body extends System {
  constructor(address, id) {
    super(address);
    this.id = id;
  }
  Init() {
    db.bodies.add({ address: this.address, id: this.id }).catch(() => {});
  }
  Save() {
    this.Init()
    db.bodies.update({address: this.address, id: this.id}, this)    
  }
}
exports.Body = Body;

/**
 * ----------------------------------
 * Elitist: Star Class extends Body
 * ----------------------------------
 */
class Star extends Body {
  constructor(address, id) {
    super(address, id);
    this.type = "Star"
  }
  Init() {
    db.bodies.add({ address: this.address, id: this.id }).catch(() => {});
  }
  Save() {
    this.Init()
    db.bodies.put(this)
  }
}
exports.Star = Star;

/**
 * ----------------------------------
 * Elitist: Planet Class extends Body
 * ----------------------------------
 */
class Planet extends Body {
  constructor(address, id) {
    super(address, id);
    this.type = "Planet"
  }
  Init() {
    db.bodies.add({ address: this.address, id: this.id }).catch(() => {});
  }
  Save() {
    this.Init()
    db.bodies.put(this)
  }
}
exports.Planet = Planet;

/**
 * ----------------------------------
 * Elitist: Material Class
 * ----------------------------------
 */
class Material {
  constructor(name_localised) {
    this.name = name_localised
  }
  async Check() {
    await db.materials.get({name: this.name}).then( material => {
      if (material != undefined) {
        this.quantity = material.quantity
      }
    })
  }
  Save() {
    db.materials.put(this).catch( () => { })
  }
}
exports.Material = Material;

/**
 * ----------------------------------
 * Elite Dangerous: RankIndex to Text
 * ----------------------------------
 */
const RANKS = {
  Combat: {
    0: "Harmless",
    1: "Mostly Harmless",
    2: "Novice",
    3: "Competent",
    4: "Expert",
    5: "Master",
    6: "Dangerous",
    7: "Deadly",
    8: "Elite",
  },
  Trade: {
    0: "Penniless",
    1: "Mostly Penniless",
    2: "Peddler",
    3: "Dealer",
    4: "Merchant",
    5: "Broker",
    6: "Entrepreneur",
    7: "Tycoon",
    8: "Elite",
  },
  Explore: {
    0: "Aimless",
    1: "Mostly Aimless",
    2: "Scout",
    3: "Surveyor",
    4: "Explorer",
    5: "Pathfinder",
    6: "Ranger",
    7: "Pioneer",
    8: "Elite",
  },
  Federation: {
    0: "None",
    1: "Recruit",
    2: "Cadet",
    3: "Midshipman",
    4: "Petty Officer",
    5: "Chief Petty Officer",
    6: "Warrant Officer",
    7: "Ensign",
    8: "Lieutenant",
    9: "Lt. Commander",
    10: "Post Commander",
    11: "Post Captain",
    12: "Read Admiral",
    13: "Vice Admiral",
    14: "Admiral",
  },
  Empire: {
    0: "None",
    1: "Outsider",
    2: "Serf",
    3: "Master",
    4: "Squire",
    5: "Knight",
    6: "Lord",
    7: "Baron",
    8: "Viscount",
    9: "Count",
    10: "Earl",
    11: "Marquis",
    12: "Duke",
    13: "Prince",
    14: "King",
  },
  CQC: {
    0: "Helpless",
    1: "Mostly Helpless",
    2: "Amateur",
    3: "Semi Professional",
    4: "Professional",
    5: "Champion",
    6: "Hero",
    7: "Legend",
    8: "Elite",
  },
};
exports.RANKS = RANKS;

/**
 * ----------------------------------
 * Elite Dangerous: Factions
 * ----------------------------------
 */
const FACTIONS = ["Empire", "Federation", "Independent", "Alliance"];
exports.FACTIONS = FACTIONS;

/**
 * ----------------------------------
 * Elite Dangerous: Raw Materials
 * ----------------------------------
 */
const RAW = {
  antimony: { grade: 4, symbol: "Sb" },
  arsenic: { grade: 2, symbol: "As" },
  boron: { grade: 1, symbol: "B" },
  cadmium: { grade: 3, symbol: "Cd" },
  carbon: { grade: 1, symbol: "C" },
  chromium: { grade: 2, symbol: "Cr" },
  germanium: { grade: 2, symbol: "Ge" },
  iron: { grade: 1, symbol: "Fe" },
  lead: { grade: 1, symbol: "Pb" },
  manganese: { grade: 2, symbol: "Mn" },
  mercury: { grade: 3, symbol: "Hg" },
  molybdenum: { grade: 3, symbol: "Mo" },
  nickel: { grade: 1, symbol: "Ni" },
  niobium: { grade: 3, symbol: "Nb" },
  phosphorus: { grade: 1, symbol: "P" },
  polonium: { grade: 4, symbol: "Po" },
  rhenium: { grade: 1, symbol: "Re" },
  ruthenium: { grade: 4, symbol: "Ru" },
  selenium: { grade: 4, symbol: "Se" },
  sulphur: { grade: 1, symbol: "S" },
  technetium: { grade: 4, symbol: "Tc" },
  tellurium: { grade: 4, symbol: "Te" },
  tin: { grade: 3, symbol: "Sn" },
  tungsten: { grade: 3, symbol: "W" },
  vanadium: { grade: 2, symbol: "V" },
  yttrium: { grade: 4, symbol: "Y" },
  zinc: { grade: 2, symbol: "Zn" },
  zirconium: { grade: 4, symbol: "Zr" },
};
exports.RAW = RAW;

/**
 * ----------------------------------
 * Journal Event: New File
 * ----------------------------------
 */
const Fileheader = async function Fileheader(line) {
  db.logs.add({file: { name: fileName}, part: line.part, gameversion: line.gameversion, build: line.build}).catch(
    (error) => {}
  )

  let result = { callback: updateGameState, data: "Initialisating"}
  return Promise.resolve(result)
}

/**
 * ----------------------------------
 * Journal: Load event based functions from here
 * ----------------------------------
 */
const onload = require("./lib.journal/events.onload");
const travel = require("./lib.journal/events.travel");
const combat = require("./lib.journal/events.combat");
const exploration = require("./lib.journal/events.exploration");
const trade = require("./lib.journal/events.trade");
const services = require("./lib.journal/events.services");
const other = require("./lib.journal/events.other");
const live = require("./lib.journal/live.json");
// Export public functions (Imported and Local)
// module.exports = Object.assign(
//   { Cmdr, System, RAW, addCommas, RANKS, FACTIONS, Fileheader },
//    onload,
//    travel,
//    combat,
//    exploration,
//    trade,
//    services,
//    other
// );
module.exports = Object.assign(
  { Cmdr, RANKS, FACTIONS, RAW, Fileheader },
  onload,
  travel,
  combat,
  exploration,
  trade,
  services,
  other,
  live
);
