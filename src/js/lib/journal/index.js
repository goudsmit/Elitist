const interface = require('../interface')

/**
 * ----------------------------------
 * Elitist: Cmdr Class
 * ----------------------------------
 */
class Cmdr {
  constructor(name) {
    this.name = name;
    this.location = {};
    this.ship = {}
    this.session = {materials: {}, bounties: 0, bonds: 0}
    this.Init();
  }
  Init() {
    db.cmdr
      .add({ name: this.name })
      .then((id) => {
        if (id) {
          console.log("Cmdr.Init() New Commander: ");
        }
      })
      .catch(() => {});
  }
  Get() {
    return new Promise(resolve => {
      db.cmdr
      .get({ name: this.name })
      .then((cmdr) => {
        Object.assign(this, cmdr);
      }).then(() => {
        resolve(true)
      });
    })

  }
  Save() {
    return new Promise(resolve => {
      db.cmdr.update({ name: this.name }, this)
      .then((updated) => {
        // console.log("Cmdr.Save(): ", this)
        resolve(true)
      })
      .catch(() => {});
    })

  }
}
exports.Cmdr = Cmdr;

class StarShip {
  constructor(id) {
    this.id = id;
    this.hull = {}
    this.modules = {}
    this.Init();
  }
  Init() {
    db.ships
      .add({ id: this.id })
      .then((id) => {
        if (id) {
          // console.log("StarShip.Init(): ", id)
        }
      })
      .catch(() => {});
  }
  Get() {
    return new Promise(resolve => {
      db.ships.get(this.id).then((ship) => {
        Object.assign(this, ship);
      }).then(() => {
        resolve(true)
      });
    })
  }
  Save() {
    db.ships
      .update(this.id, this)
      .then((updated) => {
        if (updated) {
          // console.log("StarShip.Save(): ", this)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  wasDestroyed() {
    if (this.destroyed != undefined) {
      this.destroyed += 1;
    } else {
      this.destroyed = 1;
    }
  }
}
exports.StarShip = StarShip;

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
    this.Init();
    db.systems.update({ address: this.address }, this);
  }
  displayEconomy() {
    if (this.economy) {
      var result = [];
      if (this.economy.first != "None") {
        result.push(this.economy.first);
      }
      if (this.economy.second != "None") {
        result.unshift(this.economy.second);
      }
      // TODO: Find a better place for the spacer
      return result.join(`<span class="px-2 spacer">|</span>`);
    } else {
      return "None";
    }
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
    this.Init();
    db.bodies.update({ address: this.address, id: this.id }, this);
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
    this.type = "Star";
  }
  Init() {
    db.bodies.add({ address: this.address, id: this.id }).catch(() => {});
  }
  Save() {
    this.Init();
    db.bodies.put(this);
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
    this.type = "Planet";
  }
  Init() {
    db.bodies.add({ address: this.address, id: this.id }).catch(() => {});
  }
  Save() {
    this.Init();
    db.bodies.put(this);
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
    this.name = name_localised;
  }
  async Check() {
    await db.materials.get({ name: this.name }).then((material) => {
      if (material != undefined) {
        // this.quantity = material.quantity;
        Object.assign(this, material)
      }
    });
  }
  Save() {
    db.materials.put(this).catch(() => {});
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
 * Elite Dangerous: Localised Vehicle names
 * The Journal is a bit sketchy with adding a Localised name.
 * Therefore a map, so we always have a pretty shiptype
 * ----------------------------------
 */
const VEHICLEMAP = {
  asp: "Asp Explorer",
  asp_scout: "Asp Scout",
  cobramkiii: "Cobra Mk III",
  cobramkiv: "Cobra Mk IV",
  cutter: "Imperial Cutter",
  diamondback: "Diamondback Scout",
  diamondbackxl: "Diamondback Explorer",
  empire_courier: "Imperial Courier",
  empire_eagle: "Imperial Eagle",
  empire_fighter: "Gu-97",
  empire_trader: "Imperial Clipper",
  federation_dropship: "Federal Dropship",
  federation_dropship_mkii: "Federal Assault Ship",
  federation_fighter: "F63 Condor",
  federation_gunship: "Federal Gunship",
  independent_fighter: "Taipan",
  independant_trader: "Keelback",
  krait_light: "Krait Phantom",
  krait_mkii: "Krait Mk II",
  TestBuggy: "SRV Scarab",
  type6: "Type-6 Transporter",
  type7: "Type-7 Transporter",
  type9: "Type-9 Heavy",
  typex: "Alliance Chieftain",
  typex_2: "Alliance Crusader",
  viper: "Viper Mk III",
  viper_mkiv: "Viper Mk IV",
};
const getShipType = (type) => {
  let shipType =
    VEHICLEMAP[type.toLowerCase()] == undefined
      ? type
      : VEHICLEMAP[type.toLowerCase()];
  return shipType;
}
exports.getShipType = getShipType;



const onload = require('./events.onload');
const travel = require('./events.travel');
const combat = require('./events.combat');
const exploration = require('./events.exploration');
const services = require('./events.services');
const trade = require('./events.trade');
const other = require('./events.other');
/**
 * -------------------------
 * Journal: New File event
 * Game is started
 * -------------------------
 */
const Fileheader = (line) => {
  return new Promise(async (resolve) => {
    db.logs.add({file: { name: fileName}, part: line.part, gameversion: line.gameversion, build: line.build}).catch(
      (error) => {}
    )
    result = { callback: interface.setGameState, data: Object.assign({}, line)};
    resolve(result);
  });
};


module.exports = Object.assign(
  {
    Cmdr,
    StarShip,
    System,
    Body,
    Planet,
    Star,
    Material,
    RAW,
    RANKS,
    FACTIONS,
    getShipType,
    Fileheader,
  },
  onload,
  travel,
  combat,
  exploration,
  services,
  trade,
  other
);
