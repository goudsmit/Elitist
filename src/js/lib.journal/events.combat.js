// events.combat.js

// Api manual chapter 5. Combat
const Bounty = function  Bounty(line) {
  // Don't do a lot of combat, so maybe in the future?
  return;
};
const CapShipBond = function  CapShipBond(line) {
  console.log(line);
};
const Died = function  Died(line) {
  Cmdr.ShipDestroy(Cmdr.ship.id)
  Cmdr.Save()
};

const EscapeInterdiction = function  EscapeInterdiction(line) {
  // Maybe a Log Messages, otherwise not really value?
  return;
};
const FactionKillBond = function  FactionKillBond(line) {
  console.log(line);
};
const FighterDestroyed = function  FighterDestroyed(line) {
  console.log(line);
};
const HeatDamage = function  HeatDamage(line) {
  let result = {
    callback: updateAlertState,
    data: { event: line.event },
  };
  return Promise.resolve(result)
};
const HeatWarning = function  HeatWarning(line) {
  let result = {
    callback: updateAlertState,
    data: { event: line.event },
  };
  return Promise.resolve(result);
};
const HullDamage = function  HullDamage(line) {
  if (!Cmdr.inSrv) {
    Cmdr.ship.hull.health = line.Health;
    Cmdr.Save();
  }

  let result = {
    callback: updateAlertState,
    data: { event: line.event },
  };
  return Promise.resolve(result);
};
const Interdicted = function  Interdicted(line) {
  let result = {
    callback: updateAlertState,
    data: { event: line.event },
  };
  return Promise.resolve(result);
};
const Interdiction = function  Interdiction(line) {
  console.log(line);
};
const PVPKill = function  PVPKill(line) {
  console.log(line);
};
const ShieldState = function  ShieldState(line) {
  console.log(line);
};
const ShipTargeted = function  ShipTargeted(line) {
  // Future Idea, target frame flash?
  return;
};
const ShipTargetted = function  ShipTargetted(line) {
  // Future Idea, target frame flash?
  return;
};
const SRVDestroyed = function  SRVDestroyed(line) {
  console.log(line);
};
const UnderAttack = function  UnderAttack(line) {
  let result = {
    callback: updateAlertState,
    data: { event: line.event, target: line.Target },
  };
  return Promise.resolve(result)
};

module.exports = {
  Bounty,
  Died,
  EscapeInterdiction,
  HeatDamage,
  HeatWarning,
  HullDamage,
  Interdicted,
  // ShipTargeted,
  // ShipTargetted,
  UnderAttack
};
