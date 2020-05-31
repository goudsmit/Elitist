const elements = require('./elements');
const interface = require('../interface');

exports.updateShip = async (ship = Cmdr.ship) => {
  elements.shipName.innerText = ship.name;
  elements.shipId.innerText = ship.ident;
  elements.shipType.innerText = ship.type;
  elements.shipRebuy.innerText = ship.rebuy ? interface.formatNumber(ship.rebuy) : "-";
  if (ship.hull) {
    elements.shipValue.innerText = ship.hull.value
      ? interface.formatNumber(ship.hull.value)
      : "-";
    elements.shipHealth.innerText = ship.hull.health
      ? Math.round(ship.hull.health * 100)
      : "-";
  }
  if (!ship.fuel) {
    elements.shipFuel.style.display = "none";
  } else {
    elements.shipFuel.style.display = "flex";
    let fuelCurrent = Math.round(ship.fuel.level * 10) / 10;
    interface.setFuelLevel(fuelCurrent, ship.fuel.capacity)
  }
}