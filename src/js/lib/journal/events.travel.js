// ./js/lib/journal/events.travel.js
/**
 * -------------------------
 * Api Chapter 4. Travel
 * -------------------------
 */
const ui = require('../../ui.updates');

const ApproachBody = (line) => {
  return new Promise((resolve) => {
    let result = {callback: ui.updateLog, data: {event: line.event, body: {name: line.Body, id: line.BodyID}}}
    resolve(result);
  })
}

const Docked = (line) => {
  return new Promise((resolve) => {
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
    Cmdr.location.dock = station
    let result = { callback: ui.updateDock, data: station };
    resolve(result);
  });
};

const DockingCancelled = (line) => {
  return new Promise((resolve) => {
    
  })
}

const DockingDenied = (line) => {
  return new Promise((resolve) => {
    
  })
}

const DockingGranted = (line) => {
  return new Promise((resolve) => {
    result = {callback: ui.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}

const DockingRequested = (line) => {
  return new Promise((resolve) => {
    result = {callback: ui.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}

const DockingTimeout = (line) => {
  return new Promise((resolve) => {
    
  })
}

const FSDJump = (line) => {
  return new Promise((resolve) => {
    Cmdr.location.address = line.SystemAddress;
    // console.log("FSDJump: ", line.timestamp, Cmdr.location.address, line.StarSystem);
    ui.updateTravelState({event: line.event, name: line.StarSystem})
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
  
    let result = { callback: ui.updateLocation, data: System };
    resolve(result)   
  })
}

const FSDTarget = (line) => {
  return new Promise((resolve) => {
    // From Documentation - When written: when selecting a star system to jump to 
    let target = {
      event: line.event,
      address: line.SystemAddress,
      name: line.Name,
      remaining: line.RemainingJumpsInRoute
    };
  
    let result = { callback: ui.updateTravelState, data: target };    
    resolve(result);
  })
}
const LeaveBody = (line) => {
  return new Promise((resolve) => {
    let result = {callback: ui.updateLog, data: {event: line.event, body: {name: line.Body, id: line.BodyID}}}
    resolve(result);
  })
}

const Location = (line) => {
  return new Promise((resolve) => {
    // Update Cmdr Location
    let location = {
      address: line.SystemAddress,
      docked: line.Docked,
    };
    Object.assign(Cmdr.location, location);
    // console.log("Location: ", Cmdr.location.address);

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

    let result = { callback: ui.updateLocation, data: System };
    resolve(result);
  });
};

const StartJump = (line) => {
  return new Promise((resolve) => {
  // Start of Countdown
    let destination = {};
    if (line.JumpType == "Hyperspace") {
      destination = {
        event: line.event,
        address: line.SystemAddress,
        name: line.StarSystem,
        starclass: line.StarClass,
      };
    }
    let result = {
      callback: ui.updateTravelState,
      data: Object.assign(destination, {
        event: line.event,
        jumpType: line.JumpType,
      }),
    };
    resolve(result);
  })
}

const SupercruiseEntry = (line) => {
  return new Promise(resolve => {
    let result = {callback: ui.updateLog, data: {event: line.event}}
    resolve(result);
  })

}

const SupercruiseExit = (line) => {
  return new Promise(resolve => {
    let Body = new journal.Body(line.SystemAddress, line.BodyID);
    var bodyUpdate = {
      name: line.Body,
      type: line.BodyType,
    };
    Object.assign(Body, bodyUpdate);
    Body.Save();

    result = { callback: ui.updateBodies };
    resolve(result)
  })
}

const Undocked = (line) => {
  return new Promise((resolve) => {
    Cmdr.location.docked = false;
    Cmdr.location.dock = null;
    let result = { callback: ui.updateDock };    
    resolve(result)
  });
};

module.exports = {
  ApproachBody,
  Docked,
  DockingGranted,
  DockingRequested,
  FSDJump,
  FSDTarget,
  LeaveBody,
  Location,
  StartJump,
  SupercruiseEntry,
  SupercruiseExit,
  Undocked
};
