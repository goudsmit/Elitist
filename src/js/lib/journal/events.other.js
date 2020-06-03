// ./js/lib/journal/events.other.js
/**
 * -------------------------
 * Api Chapter 12. Other Events
 * -------------------------
 */
const interface = require('../interface');
const journal = require('../journal')

const ApproachSettlement = (line) => {
  return new Promise((resolve) => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result);
  });
};
const ChangeCrewRole = (line) => Promise.resolve(true)
const CommitCrime = (line) => {
  let result = {callback: interface.updateLog, data: Object.assign({}, line)}
  return Promise.resolve(result);  
}
const CrewMemberJoins = (line) => Promise.resolve(true)
const CrewMemberQuits = (line) => Promise.resolve(true);
const DatalinkScan = (line) => Promise.resolve(true);
const DatalinkVoucher = (line) => {
  return new Promise((resolve) => {
    let result = { callback: interface.updateLog, data: Object.assign({}, line) };
    resolve(result);
  });  
}
const DataScanned = (line) => Promise.resolve(true);
const Friends = (line) => {
  return new Promise((resolve) => {
    let result = { callback: interface.updateLog, data: Object.assign({}, line) };
    resolve(result);
  });
};
const DockFighter = (line) => {
  let result = {callback: interface.updateLog, data: Object.assign({}, line)}
  return Promise.resolve(result); 
}
const DockSRV = (line) => {
  let result = {callback: interface.updateLog, data: Object.assign({}, line)}
  return Promise.resolve(result); 
}
const EndCrewSession = (line) => Promise.resolve(true); 
const FighterRebuilt = (line) => {
  let result = {callback: interface.updateLog, data: Object.assign({}, line)}
  return Promise.resolve(result);   
}
const FuelScoop = (line) => {
  let result = {callback: interface.updateLog, data: Object.assign({}, line)}
  return Promise.resolve(result);
};
const JoinACrew = (line) => Promise.resolve(true)
const KickCrewMember = (line) => Promise.resolve(true)
const LaunchDrone = (line) => Promise.resolve(true)
const LaunchFighter = (line) => {
  return new Promise(resolve => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result);    
  })
}
const LaunchSRV = (line) => {
  return new Promise(resolve => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result);    
  })
}
const ModuleInfo = (line) => Promise.resolve(true)
const Music = (line) => Promise.resolve(true)
const NpcCrewPaidWage = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.Amount
    let result = { callback: interface.updateLog, data: Object.assign({}, line) };
    resolve(result);
  })
}
const NpcCrewRank = (line) => {
  return new Promise(resolve => {
    let result = { callback: interface.updateLog, data: Object.assign({}, line) };
    resolve(result);
  })  
}
const PayFines = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.Amount
    let result = { callback: interface.updateLog, data: Object.assign({}, line) };
    resolve(result);
  })
}
const Promotion = (line) => {
  return new Promise(resolve => {
    for (rank in journal.RANKS) {
      if (line.hasOwnProperty(rank)) {
        db.ranks.update({ type: rank }, { level: line[rank], progress: 0 })
      }
    }
    interface.updateLog(Object.assign({}, line))
    let result = {callback: interface.updateRanks, data: Object.assign({}, line)}
    resolve(result)    
  })
}
const ProspectedAsteroid = (line) => {
  return new Promise(resolve => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)        
  })
}
const QuitACrew = (line) => Promise.resolve(true)
const ReceiveText = (line) => {
  // TODO: toasts? Or Session! Wing messages might be interesting...
  return Promise.resolve(true);
};
const ReservoirReplenished = (line) => Promise.resolve(true);
const Resurrect = (line) => {
  return new Promise(resolve => {
    // TODO: Please don't use this when you get bankrupt.. Thats complicated. :P
    Cmdr.ship.hull.health = 1
    Cmdr.credits -= line.Cost
    let result = { callback: interface.updateLog, data: Object.assign({}, line) };
    resolve(result)
  })  
}
const Scanned = (line) => {
  return new Promise((resolve) => {
    let result = { callback: interface.updateLog, data: Object.assign({}, line) };
    resolve(result);
  });
};
const SendText = (line) => {
  // TODO: toasts? Or Session! Wing messages might be interesting...
  return Promise.resolve(true); 
}
const Shutdown = (line) => {
  // TODO: Port to Interface logic
  return new Promise((resolve) => {
    let session
    if (elitist.cmdr) {
      session = Cmdr.session
      Cmdr.session = {materials: {}, bounties: 0, bonds: 0}
      // Cmdr.Save();
    }
    db.logs.update(fileName, { shutdown: true });
    lineSeq = -1;
    let result = { callback: interface.setGameState, data: Object.assign({}, line, session) };
    resolve(result);
  });
};
const Synthesis = (line) => {
  return new Promise(resolve => {
    line.Materials.forEach(material => {
      let Material = new journal.Material(material.Name)
      Material.Check().then(() => {
          Material.quantity -= material.Count
          Material.Save()
      })      
    });
    let result = { callback: interface.updateLog, data: Object.assign({}, line) };
    resolve(result);
  })
}
const SystemsShutdown = (line) => {
  return new Promise((resolve) => {
    let result = { callback: interface.updateLog, data: Object.assign({}, line) };
    resolve(result);
  })
}
const USSDrop = (line) => Promise.resolve(true);
const VehicleSwitch = (line) => {
  return new Promise((resolve) => {
    let result = { callback: interface.updateLog, data: Object.assign({}, line) };
    resolve(result);
  })  
}

module.exports = {
  ApproachSettlement,
  ChangeCrewRole,
  CommitCrime,
  CrewMemberJoins,
  CrewMemberQuits,
  DatalinkScan,
  DatalinkVoucher,
  DataScanned,
  DockFighter,
  DockSRV,
  EndCrewSession,
  FighterRebuilt,
  Friends,
  FuelScoop,
  JoinACrew,
  KickCrewMember,
  LaunchDrone,
  LaunchFighter,
  LaunchSRV,
  ModuleInfo,
  Music,
  NpcCrewPaidWage,
  NpcCrewRank,
  PayFines,
  Promotion,
  ProspectedAsteroid,
  QuitACrew,
  ReceiveText,
  ReservoirReplenished,
  Resurrect,
  Scanned,
  SendText,
  Shutdown,
  Synthesis,
  SystemsShutdown,
  USSDrop,
  VehicleSwitch
};
