// ./js/lib.journal/events.travel.js
const journal = require("../journal");

// Api manual chapter 4: Travel
const ApproachBody = async function ApproachBody(line) {
  let Body = new journal.Body(line.SystemAddress, line.BodyID);
  var bodyUpdate = {
    name: line.Body,
  };
  Object.assign(Body, bodyUpdate);
  Body.Save();

  let result = { callback: updateBodies };
  return Promise.resolve(result);
};
const Docked = async function Docked(line) {
  Cmdr.location.docked = true;
  Cmdr.Save();

  let station = {
    name: line.StationName,
    type: line.StationType,
    faction: line.StationFaction,
    government: line.StationGovernment_Localised,
    allegiance: line.StationAllegiance,
    services: line.StationServices,
    economy: line.StationEconomy_Localised,
    economies: line.StationEconomies,
  };

  let result = { callback: updateDock, data: station };
  return Promise.resolve(result);
};
const DockingCancelled = async function DockingCancelled(line) {
  console.log(line);
};
const DockingDenied = async function DockingDenied(line) {
  let dock = {
    event: line.event,
    reason: line.Reason
  }
  let result = {callback: updateTravelState, data: dock}
  return Promise.resolve(result);
};
const DockingGranted = async function DockingGranted(line) {
  let dock = {
    event: line.event,
    pad: line.landingPad
  }
  let result = {callback: updateTravelState, data: dock}
  return Promise.resolve(result);
};
const DockingRequested = async function DockingRequested(line) {
  let request = {
    event: line.event,
    station: line.StationName,
    type: line.StsationType,
  };
  let result = { callback: updateTravelState, data: request };
  return Promise.resolve(result);
};
const DockingTimeout = async function DockingTimeout(line) {
  return;
};

const FSDJump = async function FSDJump(line) {
  Cmdr.location.address = line.SystemAddress;
  Cmdr.ship.fuel.level = line.FuelLevel;
  Cmdr.Save();

  let System = new journal.System(line.SystemAddress);
  var systemUpdate = {
    name: line.StarSystem,
    position: line.StarPos,
    allegiance: line.SystemAllegiance,
    economy: {
      first: line.SystemEconomy_Localised,
      second: line.SystemSecondEconomy_Localised,
    },
    government: line.SystemGovernment_Localised,
    security:
      line.SystemSecurity_Localised == undefined
        ? line.SystemSecurity
        : line.SystemSecurity_Localised,
    population: line.Population,
  };
  Object.assign(System, systemUpdate);
  System.Save();

  let result = { callback: updateLocation, data: { ...System } };
  return Promise.resolve(result);
};

const FSDTarget = async function FSDTarget(line) {
  let target = {
    event: line.event,
    address: line.SystemAddress,
    name: line.Name,
  };

  let result = { callback: updateTravelState, data: target };
  return Promise.resolve(result);
};

const LeaveBody = async function LeaveBody(line) {
  // Maybe Logging later
  return;
};
const Liftoff = async function Liftoff(line) {
  let result = {
    callback: updateTravelState,
    data: { event: line.event, playercontrolled: line.PlayerControlled },
  };
  return Promise.resolve(result);
};

const Location = async function Location(line) {
  // Update Cmdr Location
  let location = {
    address: line.SystemAddress,
    docked: line.Docked,
  };
  Cmdr.location = { ...Cmdr.location, ...location };
  Cmdr.Save();

  // System Information
  let System = new journal.System(line.SystemAddress);
  var systemUpdate = {
    name: line.StarSystem,
    position: line.StarPos,
    allegiance: line.SystemAllegiance,
    economy: {
      first: line.SystemEconomy_Localised,
      second: line.SystemSecondEconomy_Localised,
    },
    government: line.SystemGovernment_Localised,
    security:
      line.SystemSecurity_Localised == undefined
        ? line.SystemSecurity
        : line.SystemSecurity_Localised,
    population: line.Population,
  };
  Object.assign(System, systemUpdate);
  System.Save();

  // Body Information
  let Body = new journal.Body(line.SystemAddress, line.BodyID);
  var bodyUpdate = {
    name: line.Body,
    type: line.BodyType,
  };
  Object.assign(Body, bodyUpdate);
  Body.Save();

  let result = { callback: updateLocation, data: { ...System } };
  return Promise.resolve(result);
};

const StartJump = async function StartJump(line) {
  // Start of Countdown
  var destination;
  if (line.JumpType == "Hyperspace") {
    destination = {
      address: line.SystemAddress,
      name: line.StarSystem,
      starclass: line.StarClass,
    };
  }

  let result = { callback: updateTravelState, data: destination };
  return Promise.resolve(result);
};

const SupercruiseEntry = async function SupercruiseEntry(line) {
  let result = { callback: updateTravelState, data: line.event };
  return Promise.resolve(result);
};

const SupercruiseExit = async function SupercruiseExit(line) {
  let Body = new journal.Body(line.SystemAddress, line.BodyID);
  var bodyUpdate = {
    name: line.Body,
    type: line.BodyType,
  };
  Object.assign(Body, bodyUpdate);
  Body.Save();

  result = { callback: updateBodies };
  return Promise.resolve(result);
};

const Touchdown = async function Touchdown(line) {
  let result = {
    callback: updateTravelState,
    data: { event: line.event, playercontrolled: line.PlayerControlled },
  };
  return Promise.resolve(result);
};
const Undocked = async function Undocked(line) {
  Cmdr.location.docked = false;
  Cmdr.Save();

  let result = { callback: updateDock };
  return Promise.resolve(result);
};

module.exports = {
  ApproachBody,
  Docked,
  DockingDenied,
  DockingGranted,
  DockingRequested,
  DockingTimeout,
  FSDTarget,
  FSDJump,
  LeaveBody,
  Liftoff,
  Location,
  StartJump,
  SupercruiseEntry,
  SupercruiseExit,
  Touchdown,
  Undocked,
};
