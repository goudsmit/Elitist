const elements = require('./elements');
const bodies = require('./bodies');
const logs = require('./logs');
const materials = require('./materials');
const ship = require('./ship')
const ranks = require('./ranks')


const fullScreenFlash = () => {
  let element = elements.fullScreenAlert
  if (elements.appContainer.style.display != "none") {
    element.style.display = "flex"
    element.classList.add("flash");
    element.addEventListener("animationend", (ev) => {
      element.classList.remove("flash");
      element.style.display = "none"
    })
  }
}
exports.fullScreenFlash = fullScreenFlash

const setGameState = async (data) => {
  if (data.event == "LoadGame") {
    elements.gameStatus.innerText = "online";
    elements.gameStatus.className = "online";
    logs.updateLog(data)
    await ship.updateShip()
  } else if (data.event == "Fileheader") {
    elements.gameStatus.innerText = "initializing";
    logs.updateLog(data)
  } else if (data.event == "Shutdown") {
    elements.gameStatus.innerText = "offline";
    elements.gameStatus.className = "offline";
    logs.updateLog(data)
  }
}
exports.setGameState = setGameState

const setShipHealth = (val) => {
  let element = elements.shipHealth
  element.innerText = `${Math.round(val*100)}`
}
exports.setShipHealth = setShipHealth

const setCredits = (value, action = "ADD") => {
  let credits = parseInt(elements.cmdrCredits.dataset.cmdrCredits)
  if (action === "ADD") {
    credits += value
  } else if (action === "SUBSTRACT") {
    credits -= value
  } else if (action == "SET") {
    credits = value
  }
  elements.cmdrCredits.dataset.cmdrCredits = credits
  elements.cmdrCredits.innerText = formatNumber(credits)
  // Cmdr.credits = credits
}
exports.setCredits = setCredits

const setFuelLevel = (level, max) => {
  let fuelNumbers = elements.shipFuelNumbers
  if (!level && !max) {
    fuelNumbers.dataset.fuelLevel = fuelNumbers.dataset.fuelCapacity
  } else if (level && !max) {
    fuelNumbers.dataset.fuelLevel = level
  } else {
    fuelNumbers.dataset.fuelLevel = level
    fuelNumbers.dataset.fuelCapacity = max
  }
  elements.shipFuelNumbers.innerText = `${Math.round(fuelNumbers.dataset.fuelLevel*10)/10}/${fuelNumbers.dataset.fuelCapacity}t`
  elements.shipFuelLevelBar.value = Math.round(fuelNumbers.dataset.fuelLevel*10)/10
  elements.shipFuelLevelBar.max = fuelNumbers.dataset.fuelCapacity
}
exports.setFuelLevel = setFuelLevel

const updateOverlay = async (state) => {
  switch (state) {
    case "LoadUI":
      // elements.overlay.style.display = "none"
      elements.overlay.classList.add("fade-out");
      elements.overlay.addEventListener("animationend", (ev) => {
        elements.overlay.style.display = "none";
        elements.appContainer.style.display = "flex";
      });
      elements.appContainer.classList.add("fade-in");
      elements.appContainer.addEventListener("animationend", (ev) => {
        elements.appContainer.style.display = "flex";
      });
      break;
    case "NoCmdr":
      elements.overlayMsg.innerText = "No Commander Data Found. Start Game";
      elements.overlayMsg.classList.add("no-cmdr");
      break;
    default:
      elements.overlayMsg.classList.remove("no-cmdr");
      elements.overlay.style.display = "flex";
      break;
  }
};
exports.updateOverlay = updateOverlay

const updateLocation = async (system) => {
  elements.systemName.innerText = system.name;
  elements.systemAllegiance.innerText = system.allegiance
    ? system.allegiance
    : "none";
  elements.systemGovernment.innerText = system.government
    ? system.government
    : "none";
  let economies = [];
  if (system.economy.first) {
    economies.push(system.economy.first);
  }
  if (system.economy.second && system.economy.second != "None") {
    economies.push(system.economy.second);
  }
  elements.systemEconomies.innerHTML = economies.join(
    `<span class="spacer">|</span>`
  );
  elements.systemSecurity.innerText = system.security
    ? system.security
    : "none";
  elements.systemPopulation.innerText = formatNumber(system.population);
  elements.systemBodies.innerHTML = "";
  await bodies.updateBodies();
};
exports.updateLocation = updateLocation

/**
 * --------------------
 * Update Dock if we are Docked
 * --------------------
 */
const updateDock = async (dock) => {
    // TODO: Log message
  if (dock) {
    elements.dockPanel.style.display = "flex";
    elements.dockPanelBody.style.display = "flex";
    elements.dockingStatus.classList.add("docked");
    elements.bodyName.innerText = dock.name;
    elements.bodyType.innerText = dock.type;
    elements.bodyAllegiance.innerText = dock.allegiance
      ? dock.allegiance
      : "none";
    elements.bodyGovernment.innerText = dock.government
      ? dock.government
      : "none";
    if (dock.economies.length >= 1) {
      let economies = [];
      for (let economy of dock.economies) {
        economies.push(economy.Name_Localised);
      }
      elements.bodyEconomies.innerHTML = economies.join(
        `<span class="spacer">|</span>`
      );
    }
    elements.bodyFaction.innerText = dock.faction.Name
      ? dock.faction.Name
      : "none";
    if (dock.services) {
      elements.bodyServices.innerText = "";
      let serviceDiv = document.createElement("div");
      serviceDiv.classList.add("service");
      dock.services.forEach((service) => {
        let clone = serviceDiv.cloneNode(true);
        clone.textContent = service;
        if (service == "BlackMarket") {
          clone.classList.add(service.toLowerCase());
        }
        elements.bodyServices.append(clone);
      });
    }
  } else {
    elements.dockPanel.style.display = "none";
    elements.dockPanelBody.style.display = "none";
    elements.dockingStatus.classList.remove("docked");
  }
};
exports.updateDock = updateDock;

/**
 * --------------------
 * Update Travel State
 * 
 * Events:
 *  FSDTarget -> Which system is the target for the FSD
 *  StartJump -> Show overlay
 *  FSDJump --> Arrival in system 
 * --------------------
 */
const updateTravelState = async (data) => {
  let panels
  let event = data.event
  switch (event) {
    case "FSDTarget":
      if (data.RemainingJumpsInRoute) {
        elements.jumpsRemain.style.display = "block"
        elements.jumpsRemain.innerText = `${data.RemainingJumpsInRoute} jumps remaining`
      } else {
        elements.jumpsRemain.style.display = "none"
      }
      elements.hasTarget.style.display = "flex"
      elements.hasTarget.style.opacity = 1
      elements.fsdTarget.innerText = data.Name
      break;
    case "FSDJump":
      setFuelLevel(data.FuelLevel);
      elements.systemBodies.innerHTML = ""
      elements.travelOverlay.style.display = "none";
      panels = elements.travelPanels.querySelectorAll(".panel");
      panels.forEach((panel) => (panel.style.display = "flex"));
      updateDock();
      logs.updateLog(data)
      break;
    case "StartJump":
      if (data.JumpType == "Hyperspace") {
        panels = elements.travelPanels.querySelectorAll(".panel");
        panels.forEach((panel) => (panel.style.display = "none"));
        elements.travelOverlay.style.display = "flex";
        elements.fsdDestination.innerText = data.StarSystem;
        // let fuelable = ["O","B","A","F","G","K","M"];
        elements.fsdDestinationDetails.innerHTML = `starclass: ${data.StarClass}`;
        elements.hasTarget.style.opacity = 0
        logs.updateLog(data)
      }
      break;
    default:
      console.log(data);
      break
  }
}
exports.updateTravelState = updateTravelState

const updateCargo = async (cargo) => {
  // console.log(`updateCargo: `, cargo);
};
exports.updateCargo = updateCargo
const updateSignals = async (data) => {
  /**
   * Callbacks from:
   * event: FSSSignalDiscovered, data: signals
   */
  // console.log(data)
};
exports.updateSignals = updateSignals

const loadUI = async () => {
  if (Cmdr) {
    elements.cmdrName.innerText = Cmdr.name;
    interface.setCredits(Cmdr.credits, "SET");
    // TODO: CmdrVessel
    // elements.cmdrCredits.innerText = formatNumber(Cmdr.credits);
    await ship.updateShip();
    await ranks.updateRanks();
    await materials.updateMaterials();
    await db.systems
      .get(Cmdr.location.address, async (system) => {
        await updateLocation(system);
      })
      .catch(() => {});
    await updateDock(Cmdr.location.dock);
  }
};
exports.loadUI = loadUI

/**
 * ----------------------------------
 * Elitist: Format Number
 *
 * Large numbers will have added commas.
 * Used for credits and population
 * ----------------------------------
 */
const formatNumber = (x) => {
  if (x != undefined) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
exports.formatNumber = formatNumber

/**
 * ----------------------------------
 * Elitist: Distance between 2 systems
 * ----------------------------------
 */
const distanceInLY = (origin, dest) => {
  let distance = Math.sqrt(
    Math.pow(dest[0] - origin[0], 2) +
      Math.pow(dest[1] - origin[1], 2) +
      Math.pow(dest[2] - origin[2], 2)
  );
  return Math.round(distance * 10) / 10;
};
exports.distanceInLY = distanceInLY

module.exports = Object.assign(
  {
    elements,
    setGameState,
    setCredits,
    setFuelLevel,
    updateOverlay,
    updateLocation,
    updateDock,
    updateTravelState,
    updateCargo,
    updateSignals,
    loadUI,
    formatNumber,
    distanceInLY,
  },
  bodies,
  logs,
  materials,
  ship,
  ranks
);