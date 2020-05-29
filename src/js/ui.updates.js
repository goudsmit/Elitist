const db = require("./storage.db");
const elements = require("./ui.elements");
const interface = require("./lib/interface");
exports.elements = elements;

exports.updateOverlay = async (state) => {
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

const updateGameState = async (data) => {
  // function timeout(ms) {
  //     return new Promise(resolve => setTimeout(resolve, ms));
  // }
  // await timeout(3000);
  // console.log("update Game State after 3 seconds")
  if (data.event == "LoadGame") {
    elements.gameStatus.innerText = "online";
    elements.gameStatus.classList.remove("offline");
    elements.gameStatus.classList.add("online");
    this.updateShip();
  } else if (data.event == "Fileheader") {
    elements.gameStatus.innerText = "initializing";
  } else if (data.event == "Shutdown") {
    elements.gameStatus.innerText = "offline";
    elements.gameStatus.classList.remove("online");
    elements.gameStatus.classList.add("offline");
  }
  // console.log("update Game State", data);
};
exports.updateGameState = updateGameState;

exports.updateShip = async (ship = Cmdr.ship) => {
  elements.shipName.innerText = ship.name;
  elements.shipId.innerText = ship.ident;
  elements.shipType.innerText = ship.type;
  elements.shipRebuy.innerText = ship.rebuy ? formatNumber(ship.rebuy) : "-";
  if (ship.hull) {
    elements.shipValue.innerText = ship.hull.value
      ? formatNumber(ship.hull.value)
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
    elements.shipFuelNumbers.innerText = `${fuelCurrent}/${ship.fuel.capacity}t`;
    elements.shipFuelLevelBar.value = ship.fuel.level;
    elements.shipFuelLevelBar.max = ship.fuel.capacity;
  }
  // console.log("update Ship", data);
};

exports.updateFuel = async (data) => {
  switch (data.event) {
    case "FuelScoop":
      let fuelCurrent = Math.round(data.Total * 10) / 10;
      if (Cmdr.ship.fuel) {
        elements.shipFuelNumbers.innerText = `${fuelCurrent}/${Cmdr.ship.fuel.capacity}t`;
        elements.shipFuelLevelBar.value = data.Total;
      }
      elements.shipFuelNumbers.innerText = `${fuelCurrent}`;
      elements.shipFuelLevelBar.value = data.Total;
      elements.shipFuelLevelBar.max = data.Total;

      break;
    case "RefuelAll":
      elements.shipFuelLevelBar.value = elements.shipFuelLevelBar.max;
      break;
    default:
      console.log(data);
  }
};

exports.updateMaterials = async (material) => {
  const addMaterialRow = (material) => {
    let template = document.getElementById("materialRow");
    let clone = template.content.cloneNode(true);
    let tr = clone.querySelectorAll("tr");
    tr[0].id = material.cssname + "-row";
    tr[0].classList.add("filter-" + material.type);

    let td = clone.querySelectorAll("td");
    td[0].textContent = material.type[0];
    td[0].id = material.name;
    td[1].textContent = material.name;
    td[2].textContent = material.quantity;
    return clone;
  }
  let table = document.getElementById("materialTable");    
  if (!material) {
    let materials = await db.materials.toCollection();
    materials.each((material) => {
      let row = document.getElementById(material.cssname + "-row");
      if (!row) {
        let clone = addMaterialRow(material)
        table.append(clone);
      } else {
        var td = row.querySelectorAll("td");
        td[2].textContent = material.quantity;
      }
    });
  } else {
    let row = document.getElementById(material.cssname + "-row");
    if (!row) {
      let clone = addMaterialRow(material)
      table.append(clone);
    } else {
      let td = row.querySelectorAll("td");
      td[2].textContent = material.quantity;
    }
  }
};

exports.updateRank = async (rank) => {
  if (!rank) {
    const RANKS = require("./lib/journal/index").RANKS;
    await db.ranks.each((rank) => {
      rankId = rank.type.toLowerCase() + "Rank";
      if (elements[rankId]) {
        elements[rankId].innerText = RANKS[rank.type][rank.level];
        if (RANKS[rank.type][rank.level] === "Elite") {
          elements[rankId].classList.add("elite");
        }
      }
      rankProgress = rank.type.toLowerCase() + "Progress";
      if (elements[rankProgress]) {
        elements[rankProgress].value = rank.progress;
        if (RANKS[rank.type][rank.level] === "Elite") {
          elements[rankProgress].classList.add("elite");
        }
      }
    });
  }
  // console.log("update Rank/ All Ranks Level or Progress");
};

exports.updateCargo = async (cargo) => {
  console.log(`updateCargo: `, cargo);
};

const updateDock = async (dock) => {
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
  // console.log("update Dock", dock)
};
exports.updateDock = updateDock;

exports.updateLocation = async (system) => {
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
  if (system.economy.second) {
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
  await interface.updateBodies();
  // console.log("update Location", data, economies);
};

exports.updateTravelState = async (data) => {
  /**
   * Callbacks from:
   * event: StartJump, data: destination if Hyperspace else Supercruise
   * event: SupercruiseEntry
   * event: FSDTarget, data: systemname & address
   * event: DockingRequested, data: stationname & type
   * event: DockingGranted, data: landingpad
   * event: DockingDenied, data: Reason
   * event: LaunchSRV
   * event: DockSRV
   * event: Touchdown, data: PlayerControlled
   * event: Liftoff, data: PlayerControlled
   * event: FSDJump, NOT a callback, but a early call
   */
  let panels;
  switch (data.event) {
    case "FSDTarget":
      let remaining = data.remaining
        ? ` (${data.remaining} jumps remaining)`
        : "";
      elements.fsdTarget.innerText = `target > ${data.name}${remaining}`;
      break;
    case "StartJump":
      if (data.jumpType == "Hyperspace") {
        panels = elements.travelPanels.querySelectorAll(".panel");
        panels.forEach((panel) => (panel.style.display = "none"));
        elements.travelOverlay.style.display = "flex";
        elements.fsdDestination.innerText = data.name;
        // let fuelable = ["O","B","A","F","G","K","M"];
        // if (fuelable.includes(data.starclass)) {
        //   fuel = `<span><i class="fa fa-gas-pump></i></span>`
        // }
        elements.fsdDestinationDetails.innerHTML = `starclass: ${data.starclass}`;
      }
      break;
    case "FSDJump":
      if (elements.fsdTarget.innerText == `target > ${data.name}`) {
        elements.fsdTarget.innerText = "";
      }
      elements.travelOverlay.style.display = "none";
      panels = elements.travelPanels.querySelectorAll(".panel");
      panels.forEach((panel) => (panel.style.display = "flex"));
      this.updateDock();
      break;
    default:
      console.log("update Travel State", data);
  }
};

exports.updateSignals = async (data) => {
  /**
   * Callbacks from:
   * event: FSSSignalDiscovered, data: signals
   */
  // console.log(data)
};

exports.updateBodies = async (body) => {
  if (!body) {
    // update all bodies
    await db.bodies.where({ address: Cmdr.location.address }).each((body) => {
      // TODO: Separate function, perhaps roll into getBodyTemplate()
      if (!checkBody(body.id)) {
        addBody(body);
        [...elements.systemBodies.children]
          .sort((a, b) => a.id - b.id)
          .map((node) => elements.systemBodies.appendChild(node));
      }
    });
  } else {
    // console.log(body);
    if (!checkBody(body.id)) {
      addBody(body);
      [...elements.systemBodies.children]
        .sort((a, b) => a.id - b.id)
        .map((node) => elements.systemBodies.appendChild(node));
    }
  }
};



// exports.addDockingRequest = async (data) =>{
//   // console.log(data)
//   // let dockingRequest = elements.getDockingRequest()
//   // dockingRequest.innerText = data.event
//   // let parentNode = document.getElementById("dockPanel").parentNode
//   // let dockNode = document.getElementById("dockPanel")
//   // parentNode.insertBefore(dockingRequest, dockNode)
// }

exports.farmModeUpdate = (data) => {};

/**
 * ----------------------------------
 * Body Support Functions
 * ----------------------------------
 */
const checkBody = (id) => {
  let element = document.getElementById(id);
  return elements.systemBodies.contains(element);
};
const addBody = (body) => {
  let template = elements.getBodyTemplate();
  template.id = body.id;
  let divBodyId = template.querySelector(".id");
  divBodyId.innerHTML = `<span class="stellar type-${body.class}"></span>`
  // divBodyId.innerText = body.id;
  let divBodyName = template.querySelector(".name");
  divBodyName.innerText = body.name;
  if (body.type == "Asteroid Belt") {
    divBodyName.classList.add("small-name");
  }
  let divBodyType = template.querySelector(".type");
  divBodyType.innerText =
    body.class && body.type == "Star"
      ? `${body.class} class star `
      : body.class && body.type == "Planet"
      ? bodyClassRename(body.class)
      : body.type;
  let properties = []
  if (body.extended) {
    if (body.extended.atmosphere) {
      let atmosphereProperty = addProperty()
      atmosphereProperty.innerText = body.extended.atmosphere
      properties.push(atmosphereProperty)
    }
    if (body.extended.volcanism) {
      let volcanismProperty = addProperty()
      volcanismProperty.innerText = body.extended.volcanism
      properties.push(volcanismProperty)
    }
  }
  if (body.landable) {
    let landableProperty = addProperty()
    landableProperty.classList.add("landable");
    landableProperty.innerText = "landable"
    properties.push(landableProperty)
  }
  if(body.gravity) {
    let gravityProperty = setGravityProperty(body.gravity);
    properties.push(gravityProperty)
  }
  if(properties.length > 0) {
    let divBodyProperties = template.querySelector(".properties");
    divBodyProperties.style.display = "flex"
    properties.forEach(property => divBodyProperties.appendChild(property))
  }
  // console.log(body)
  elements.systemBodies.appendChild(template);
};
const bodyClassRename = (type) => {
  if (type == "Earthlike body") {
    return "earthlike world"
  } else if (type == "High metal content body") {
    return "high metal content world"
  } else {
    return type;
  }
}
const addProperty = (property) => {
  let template = document.createElement("div");
  template.classList.add("property");
  if (property) {
    template.classList.add(property);
  }
  return template;
}
const setGravityProperty = (gravity) => {
  let template = addProperty();
  if (gravity < 1) {
    template.classList.add("gravity-low");
  } else if (gravity > 1 && gravity < 2.5) {
    template.classList.add("gravity-medium");
  } else {
    template.classList.add("gravity-high");
  }
  template.innerText = `${Math.round(gravity*10)/10}g`
  return template;
};

/**
 * ----------------------------------
 * Log Messages
 * ----------------------------------
 */
exports.updateLog = async (data) => {
  let logEntry = elements.getLogEntryTemplate();
  let divIcon = logEntry.querySelector(".icon");
  let divEvent = logEntry.querySelector(".event");
  switch (data.event) {
    case "ApproachBody":
      divEvent.innerText = `Approaching Body: ${data.body.name}`;
      break;
    case "ApproachSettlement":
      divEvent.innerText = `Approaching: ${data.settlement}`;
      break;
    case "Bounty":
      divEvent.innerText = `Bounty rewarded: ${formatNumber(data.TotalReward)}cr`
      divEvent.classList.add("highlight");
      break;
    case "DockingGranted":
      divEvent.innerText = `Docking permitted: pad ${data.LandingPad}`;
      break;
    case "DockingRequested":
      divEvent.innerText = `Requested docking at ${data.StationName}`;
      break;
    case "Friends":
      divEvent.innerText = `friend ${data.Status}: ${data.Name}`;
      divEvent.classList.add("info");
      break;
    case "LeaveBody":
      divEvent.innerText = `Leaving Body: ${data.body.name}`;
      break;
    case "SupercruiseEntry":
      divEvent.innerText = "Entering Supercruise";
      break;
    case "StartJump":
      break;
    case "Scanned":
      divEvent.innerText = `${data.ScanType} scan detected!`;
      divEvent.classList.add("warning");
      break;
    case "UnderAttack":
      divEvent.innerText = "Under attack!"
      divEvent.classList.add("danger");
      break;
    default:
      console.log("logEntry: ", data);
      break;
  }
  elements.journalLog.insertBefore(logEntry, elements.journalLog.firstChild);
};

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

/**
 * ----------------------------------
 * Elitist: Distance between 2 systems
 * ----------------------------------
 */
exports.distanceInLY = (origin, dest) => {
  let distance = Math.sqrt(
    Math.pow(dest[0] - origin[0], 2) +
      Math.pow(dest[1] - origin[1], 2) +
      Math.pow(dest[2] - origin[2], 2)
  );
  return Math.round(distance * 10) / 10;
};
