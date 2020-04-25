// events.exploration.js
const journal = require("../journal");

// Api manual chapter 6: Exploration
const CodexEntry = async function CodexEntry(line) {
  let entry = {
    event: line.event,
    name: line.Name_Localised,
    category: line.Category_Localised,
    subcategory: name.SubCategory_Localised,
    region: line.Regio_Localised,
    system: line.System,
    new: line.IsNewEntry
  }
  let result = { callback: updateToast, data: entry}
  return Promise.resolve(result)
};
const DiscoveryScan = async function DiscoveryScan(line) {
  console.log(line);
};
const Scan = async function Scan(line) {
  // console.log(line);
  let Body
  if (line.StarType) {
    Body = new journal.Star(Cmdr.location.address, line.BodyID);
    var starUpdate = {
      name: line.BodyName,
      class: line.StarType,
      parents: line.Parents,
      extended: {
        age: line.Age_MY,
        distancefromarrivalls: line.DistanceFromArrivalLS,
        luminosity: line.Luminosity,
        mass: line.StellarMass,

        subclass: line.Subclass,
        temperature: line.SurfaceTemperature,
      },
      rings: line.Rings,
      discovered: line.Discovered,
      mapped: line.Mapped,
    };
    Object.assign(Body, starUpdate);
  } else if (line.PlanetClass) {
    Body = new journal.Planet(Cmdr.location.address, line.BodyID);
    planetUpdate = {
      name: line.BodyName,
      class: line.PlanetClass,
      parents: line.Parents,
      rings: line.Rings,
      discovered: line.Discovered,
      mapped: line.Mapped,
      materials: line.Materials,
      gravity: line.SurfaceGravity,
      landable: line.Landable,
      extended: {
        atmosphere: line.Atmosphere,
        atmospheretype: line.AtmosphereType,
        atmospherecomposition: line.AtmosphereComposition,
        composition: line.Composition,
        distancefromarrivalls: line.DistanceFromArrivalLS,
        mass: line.MassEM,
        pressure: line.SurfacePressure,
        temperature: line.SurfaceTemperature,
        terraformstate: line.TerraformState,
        tidallock: line.TidalLock,
        volcanism: line.Volcanism,
      },
    };
    Object.assign(Body, planetUpdate);
  } else {
    Body = new journal.Body(Cmdr.location.address, line.BodyID)
    beltUpdate = {
      type: "Asteroid Belt",
      name: line.BodyName,
      parents: line.Parents,
      distancefromarrivalls: line.DistanceFromArrivalLS
    }
    Object.assign(Body, beltUpdate);
  }
  Body.Save()
};
const FSSAllBodiesFound = async function FSSAllBodiesFound(line) {
  return;
};
const FSSDiscoveryScan = async function FSSDiscoveryScan(line) {
  let discovery = {
    event: line.event,
    progress: line.Progress,
    bodycount: line.BodyCount,
    nonbodycount: line.NonBodyCount
  }
  let result = { callback: updateBodies, data: discovery}
  return Promise.resolve(result)
};
const FSSSignalDiscovered = async function FSSSignalDiscovered(line) {
  let signal = {
    name: line.SignalName,
    state: line.SpawningState,
    faction: line.SpawningFaction,
    time: line.TimeRemaining,
    address: line.SystemAddress,
    threatlevel: line.ThreatLevel,
    usstype: line.USSType,
    station: line.IsStation
  }

  let result = {callback: updateSignals, data: signal}
  return Promise.resolve(result)
};
const MaterialCollected = async function MaterialCollected(line) {
  var materialName = (line.Name_Localised == undefined) ? line.Name : line.Name_Localised
  let Material = new journal.Material(materialName);
  await Material.Check().then( () => {
    if (Material.quantity) {
        Material.quantity += line.Count;
      } else {
        Material.quantity = line.Count;
      }
      Material.type = line.Category;
      Material.cssname = line.Name;
      Material.Save();
    }
  );

  result = { callback: updateMaterials };
  return Promise.resolve(result);
};

const MaterialDiscarded = async function MaterialDiscarded(line) {
  console.log(line);
};
const MaterialDiscovered = async function MaterialDiscovered(line) {
  // Could be a log event, Popup or something.. later though
  return;
};
const MultiSellExplorationData = async function MultiSellExplorationData(line) {
  Cmdr.credits += line.TotalEarnings
  Cmdr.Save()

  let result = { callback: updateToast, data: line.Discovered}
  return Promise.resolve(result)
};
const NavBeaconScan = async function NavBeaconScan(line) {
  // Could do something with number of bodies, ... maybe
  return;
};
const BuyExplorationData = async function BuyExplorationData(line) {
  console.log(line);
};
const SAAScanComplete = async function SAAScanComplete(line) {
  let scan = {
    event: line.event,
    name: line.BodyName,
    id: line.BodyID,
    probes: line.ProbesUsed,
    efficiency: line.EfficiencyTarget
  }
};
const SellExplorationData = async function SellExplorationData(line) {
  Cmdr.credit += line.TotalEarnings;
  Cmdr.Save();

  let result = {
    callback: updateToast,
    data: { systems: line.Systems, discovered: line.Discovered, earnings: line.TotalEarnings },
  };
  return Promise.resolve(result);
};
const Screenshot = async function Screenshot(line) {
  return;
};

module.exports = {
  CodexEntry,
  FSSAllBodiesFound,
  FSSDiscoveryScan,
  FSSSignalDiscovered,
  MaterialCollected,
  MaterialDiscovered,
  MultiSellExplorationData,
  NavBeaconScan,
  SAAScanComplete,
  Scan,
  SellExplorationData,
  Screenshot
};
