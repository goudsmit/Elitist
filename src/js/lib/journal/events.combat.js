// ./js/lib/journal/events.combat.js
/**
 * -------------------------
 * Api Chapter 5. Combat
 * -------------------------
 */
const interface =require('../interface');

const Bounty = (line) => {
  return new Promise(resolve => {
    Cmdr.session.bounties += parseInt(line.TotalReward)
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const CapShipBond = (line) => {
  return new Promise(resolve => {
    resolve(true)
  })
}

const Died = (line) => {
  return new Promise(resolve => {
    Cmdr.ship.wasDestroyed()
    Cmdr.ship.Save()
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const EscapeInterdiction = (line) => {
  return new Promise(resolve => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result);
  })
}
const FactionKillBond = (line) => {
  return new Promise(resolve => {
    resolve(true)
  })
}
const FighterDestroyed = (line) => {
  return new Promise(resolve => {
    resolve(true)
  })
}

const HeatDamage = (line) => {
  return new Promise(resolve => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const HeatWarning = (line) => {
  return new Promise(resolve => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const HullDamage = (line) => {
  return new Promise(resolve => {
    if (line.PlayerPilot) {
      Cmdr.ship.hull.health = line.Health
    }
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}
const Interdicted = (line) => {
  return new Promise(resolve => {
    resolve(true)
  })
}
const Interdiction = (line) => {
  return new Promise(resolve => {
    resolve(true)
  })
}
const PVPKill = (line) => {
  return new Promise(resolve => {
    resolve(true)
  })
}
const ShieldState = (line) => {
  return new Promise(resolve => {
    resolve(true)
  })
}
const ShipTargeted = (line) => Promise.resolve(true);
const ShipTargetted = ShipTargeted

const SRVDestroyed = (line) => {
  return new Promise(resolve => {
    resolve(true)
  })
}

const UnderAttack = (line) => {
  return new Promise(resolve => {
    let result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}

module.exports = {
  Bounty,
  Died,
  EscapeInterdiction,
  HeatDamage,
  HeatWarning,
  HullDamage,
  ShipTargeted,
  ShipTargetted,
  UnderAttack
};