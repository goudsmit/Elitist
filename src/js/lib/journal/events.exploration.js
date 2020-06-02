// ./js/lib/journal/events.exploration.js
/**
 * -------------------------
 * Api Chapter 6. Exploration
 * -------------------------
 */
const interface = require('../interface')

const CodexEntry = (line) => {
  return new Promise(resolve => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)   
  })
}
const DiscoveryScan = (line) => {
  return new Promise(resolve => {
    resolve(true)
  })
}

const FSSAllBodiesFound = (line) => {
  return new Promise(resolve => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)    
  })
}
const FSSDiscoveryScan = (line) => {
  return new Promise(resolve => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)    
  })
}
const FSSSignalDiscovered = (line) => {
  return new Promise((resolve) => {
    let signal = {
      name: line.SignalName,
      state: line.SpawningState,
      faction: line.SpawningFaction,
      time: line.TimeRemaining,
      address: line.SystemAddress,
      threatlevel: line.ThreatLevel,
      usstype: line.USSType,
      station: line.IsStation,
    };

    let result = { callback: interface.updateSignals, data: signal };
    resolve(result);
  });
};
const MaterialCollected = (line) => {
  return new Promise(resolve => {
    let materialName = (line.Name_Localised == undefined) ? line.Name : line.Name_Localised
    let Material = new journal.Material(materialName)
    Material.Check().then( async () => {
      if (Material.quantity) {
        Material.quantity += line.Count;
      } else {
        Material.quantity = line.Count;
      }
      Material.type = line.Category;
      Material.cssname = line.Name;
      Material.Save();
       await interface.addMaterialToSession(Material).then( () => {
        Cmdr.session.materials[Material.cssname].quantity += line.Count
      })
    }).then(() => {
      let result = {callback: interface.updateMaterials, data: Material}
      resolve(result)
    })
  })
}
const MaterialDiscovered = (line) => {
  return new Promise(resolve => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const MultiSellExplorationData = (line) => {
  return new Promise(resolve => {
    Cmdr.credits += line.TotalEarnings
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const NavBeaconScan = (line) => Promise.resolve(true);
const SAAScanComplete = (line) => {
  return new Promise(resolve => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)    
  })
}
const Scan = (line) => {
  return new Promise(resolve => {
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
        discovered: line.wasDiscovered,
        mapped: line.wasMapped,
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

    result = {callback: interface.updateBodies, data: Body}
    resolve(result)
  })
}
const Screenshot = (line) => Promise.resolve(true)
const SellExplorationData = (line) => {
  return new Promise(resolve => {
    Cmdr.credits += line.TotalEarnings
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)        
  })
}

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
  Screenshot,
  SellExplorationData
}