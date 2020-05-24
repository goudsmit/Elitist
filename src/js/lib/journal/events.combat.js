// ./js/lib/journal/events.combat.js
/**
 * -------------------------
 * Api Chapter 5. Combat
 * -------------------------
 */
const ui = require('../../ui.updates');
const Bounty = (line) => {
  return new Promise(resolve => {
    let result = {callback: ui.updateLog, data: Object.assign({}, line)}
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
    resolve(true)
  })
}
const EscapeInterdiction = (line) => {
  return new Promise(resolve => {
    resolve(true)
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
    resolve(true)
  })
}
const HeatWarning = (line) => {
  return new Promise(resolve => {
    resolve(true)
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
    let result = {callback: ui.updateLog, data: Object.assign({}, line)}
    resolve(result)
  })
}

module.exports = {
  Bounty,
  ShipTargeted,
  ShipTargetted,
  UnderAttack
};