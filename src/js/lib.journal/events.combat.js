// events.combat.js

// Api manual chapter 5. Combat
const Bounty = async function Bounty(line) {
  // Don't do a lot of combat, so maybe in the future?
  return;
};
const CapShipBond = async function CapShipBond(line) {
  console.log(line);
};
const Died = async function Died(line) {
  Cmdr.ShipDestroy(Cmdr.ship.id)
  Cmdr.Save()
};

const EscapeInterdiction = async function EscapeInterdiction(line) {
  // Maybe a Log Messages, otherwise not really value?
  return;
};
const FactionKillBond = async function FactionKillBond(line) {
  console.log(line);
};
const FighterDestroyed = async function FighterDestroyed(line) {
  console.log(line);
};
const HeatDamage = async function HeatDamage(line) {
  let result = {
    callback: updateAlertState,
    data: { event: line.event },
  };
  return Promise.resolve(result)
};
const HeatWarning = async function HeatWarning(line) {
  let result = {
    callback: updateAlertState,
    data: { event: line.event },
  };
  return Promise.resolve(result);
};
const HullDamage = async function HullDamage(line) {
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
const Interdicted = async function Interdicted(line) {
  let result = {
    callback: updateAlertState,
    data: { event: line.event },
  };
  return Promise.resolve(result);
};
const Interdiction = async function Interdiction(line) {
  console.log(line);
};
const PVPKill = async function PVPKill(line) {
  console.log(line);
};
const ShieldState = async function ShieldState(line) {
  console.log(line);
};
const ShipTargeted = async function ShipTargeted(line) {
  // Future Idea, target frame flash?
  return;
};
const ShipTargetted = async function ShipTargetted(line) {
  // Future Idea, target frame flash?
  return;
};
const SRVDestroyed = async function SRVDestroyed(line) {
  console.log(line);
};
const UnderAttack = async function UnderAttack(line) {
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
  ShipTargeted,
  ShipTargetted,
  UnderAttack
};
