// ./js/lib.journal/events.travel.js
const journal = require("../journal");

// Api manual chapter 4: Travel
const ApproachBody = function ApproachBody(line) {
  let Body = new journal.Body(line.SystemAddress, line.BodyID);
  var bodyUpdate = {
    name: line.Body,
  };
  Object.assign(Body, bodyUpdate);
  Body.Save();

  let result = { callback: updateBodies };
  return Promise.resolve(result);
};
const Docked = function Docked(line) {
  Cmdr.location.docked = true;

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
const DockingCancelled = function DockingCancelled(line) {
  console.log(line);
};
const DockingDenied = function DockingDenied(line) {
  let dock = {
    event: line.event,
    reason: line.Reason
  }
  let result = {callback: updateTravelState, data: dock}
  return Promise.resolve(result);
};
const DockingGranted = function DockingGranted(line) {
  let dock = {
    event: line.event,
    pad: line.landingPad
  }
  let result = {callback: updateTravelState, data: dock}
  return Promise.resolve(result);
};
const DockingRequested = function DockingRequested(line) {
  let request = {
    event: line.event,
    station: line.StationName,
    type: line.StsationType,
  };
  let result = { callback: updateTravelState, data: request };
  return Promise.resolve(result);
};
const DockingTimeout = function DockingTimeout(line) {
  return;
};

const FSDJump = function FSDJump(line) {
  Cmdr.location.address = line.SystemAddress;
  console.log("FSDJump: ", line.timestamp, Cmdr.location.address, line.StarSystem)
  // TODO: Drop in favour of Status.json updates.
  if (Cmdr.ship.fuel != undefined) {
    Cmdr.ship.fuel.level = line.FuelLevel
  }

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

  let result = { callback: updateLocation, data: System };
  return Promise.resolve(result);
};

const FSDTarget = function FSDTarget(line) {
  let target = {
    event: line.event,
    address: line.SystemAddress,
    name: line.Name,
  };

  let result = { callback: updateTravelState, data: target };
  return Promise.resolve(result);
};

const LeaveBody = function LeaveBody(line) {
  // Maybe Logging later
  return;
};
const Liftoff = function Liftoff(line) {
  let result = {
    callback: updateTravelState,
    data: { event: line.event, playercontrolled: line.PlayerControlled },
  };
  return Promise.resolve(result);
};

const Location = function Location(line) {
  // Update Cmdr Location
  let location = {
    address: line.SystemAddress,
    docked: line.Docked,
  };
  Object.assign(Cmdr.location, location)
  console.log("Location: ", Cmdr.location.address)


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
  if (Body.name == "Hickam Survey") {
    console.log("Hickam Survey: ", line, line.SystemAddress)
  }
  Body.Save();

  let result = { callback: updateLocation, data: System };
  return Promise.resolve(result);
};

const StartJump = function StartJump(line) {
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

const SupercruiseEntry = function SupercruiseEntry(line) {
  let result = { callback: updateTravelState, data: line.event };
  return Promise.resolve(result);
};

const SupercruiseExit = function SupercruiseExit(line) {
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

const Touchdown = function Touchdown(line) {
  let result = {
    callback: updateTravelState,
    data: { event: line.event, playercontrolled: line.PlayerControlled },
  };
  return Promise.resolve(result);
};
const Undocked = function Undocked(line) {
  Cmdr.location.docked = false;

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
