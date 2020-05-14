const db = require('./storage.db');
const elements = require('./ui.elements')
exports.elements = elements


exports.updateOverlay = async (state) => {
  switch (state) {
    case "LoadUI":
      // elements.overlay.style.display = "none"
      elements.overlay.classList.add("fade-out");
      elements.overlay.addEventListener("animationend", (ev) => {
        elements.overlay.style.display = "none"
        elements.appContainer.style.display = "flex"
      });
      elements.appContainer.classList.add("fade-in")
      elements.appContainer.addEventListener("animationend", (ev) => {
        elements.appContainer.style.display = "flex"
      })
      break;
    case "NoCmdr":
      elements.overlayMsg.innerText = "No Commander Data Found. Start Game"
      elements.overlayMsg.classList.add("no-cmdr");
      break;
    default:
      elements.overlayMsg.classList.remove("no-cmdr");
      elements.overlay.style.display = "flex"
      break;
  }
}


const updateGameState = async (data) => {
  // function timeout(ms) {
  //     return new Promise(resolve => setTimeout(resolve, ms));
  // }
  // await timeout(3000);
  // console.log("update Game State after 3 seconds")
  if (data.event == "LoadGame") {
    elements.gameStatus.innerText = "online"
    elements.gameStatus.classList.remove("offline");
    elements.gameStatus.classList.add("online");
    updateShip()
  } else if (data.event == "Fileheader") {
    elements.gameStatus.innerText = "initializing"
  } else if (data.event == "Shutdown") {
    elements.gameStatus.innerText = "offline"
    elements.gameStatus.classList.remove("online");
    elements.gameStatus.classList.add("offline");    
  }
  // console.log("update Game State", data);
};
exports.updateGameState = updateGameState;

const updateShip = async (ship) => {
  if (!ship) {
    ship = Cmdr.ship
  }
  elements.shipName.innerText = ship.name
  elements.shipId.innerText = ship.ident
  elements.shipType.innerText = ship.type
  elements.shipRebuy.innerText = ship.rebuy ? formatNumber(ship.rebuy) : "-"
  if (ship.hull) {
    elements.shipValue.innerText = ship.hull.value ? formatNumber(ship.hull.value) : "-"  
    elements.shipHealth.innerText = ship.hull.health ? Math.round(ship.hull.health * 100) : "-"
  }
  if (!ship.fuel) {
    elements.shipFuel.style.display = "none"
  } else {
    elements.shipFuel.style.display = "flex"
    elements.shipFuelNumbers.innerText = `${ship.fuel.level} /${ship.fuel.capacity}`
    elements.shipFuelLevelBar.value = ship.fuel.level
    elements.shipFuelLevelBar.max = ship.fuel.capacity
  }
  // console.log("update Ship", data);
};
exports.updateShip = updateShip;

const updateMaterials = async () => {
  let table = document.getElementById("materialTable")
  let template = document.getElementById("materialRow")
  var materials = await db.materials.toCollection();
  materials.each((material) => {
    var row = document.getElementById(material.cssname + "-row")
    if (!row) {
      let clone = template.content.cloneNode(true)
      var tr = clone.querySelectorAll("tr")
      tr[0].id = material.cssname + "-row"
      tr[0].classList.add("filter-" + material.type)

      var td = clone.querySelectorAll("td");
      td[0].textContent = material.type[0]
      td[1].textContent = material.name
      td[2].textContent = material.quantity
      table.append(clone) 
    } else {
      var td = row.querySelectorAll("td")
      td[2] = material.quantity
    }   
  });
  // console.log("update Materials");
};
exports.updateMaterials = updateMaterials;

const updateRank = async (rank) => {
  if (!rank) {
    const RANKS = require('./lib/journal/index').RANKS
    await db.ranks.each( rank => {
      rankId = rank.type.toLowerCase() + "Rank"
      if (elements[rankId]) {
        elements[rankId].innerText = RANKS[rank.type][rank.level];
        if (RANKS[rank.type][rank.level] === "Elite") {
          elements[rankId].classList.add("elite");
        }
      }
      rankProgress = rank.type.toLowerCase() + "Progress"
      if (elements[rankProgress]) {
        elements[rankProgress].value = rank.progress
        if (RANKS[rank.type][rank.level] === "Elite") {
          elements[rankProgress].classList.add("elite")
        }
      }
    })
  }
  // console.log("update Rank/ All Ranks Level or Progress");
};
exports.updateRank = updateRank;

const updateDock = async (dock) => {
  if (dock) {
    elements.dockPanel.style.display = "flex"
    elements.dockingStatus.classList.add("docked");
    elements.bodyName.innerText = dock.name
    elements.bodyType.innerText = dock.type
    elements.bodyAllegiance.innerText = dock.allegiance ? dock.allegiance : "none"
    elements.bodyGovernment.innerText = dock.government ? dock.government : "none"
    if (dock.economies.length >= 1) {
      let economies = []
      for (let economy of dock.economies) {
        economies.push(economy.Name_Localised)
      }
      elements.bodyEconomies.innerHTML = economies.join(`<span class="spacer">|</span>`);
    }
    elements.bodyFaction.innerText = dock.faction.Name ? dock.faction.Name : "none"
    if (dock.services) {
      elements.bodyServices.innerText = ""
      let serviceDiv = document.createElement("div");
      serviceDiv.classList.add("service");
      dock.services.forEach( service => {
        let clone = serviceDiv.cloneNode(true);
        clone.textContent = service
        if (service == "BlackMarket") {
          clone.classList.add(service.toLowerCase())
        }
        elements.bodyServices.append(clone)
      })
    }
  } else {
    elements.dockPanel.style.display = "none"
  }
  // console.log("update Dock", dock)
}
exports.updateDock = updateDock;

exports.updateLocation = async (system) => {
  elements.systemName.innerText = system.name
  elements.systemAllegiance.innerText = system.allegiance ? system.allegiance : "none"
  elements.systemGovernment.innerText = system.government ? system.government : "none"
  let economies = [];
  if (system.economy.first) {
    economies.push(system.economy.first);
  }
  if (system.economy.second) {
    economies.push(system.economy.second);
  }
  elements.systemEconomies.innerHTML = economies.join(`<span class="spacer">|</span>`);
  elements.systemSecurity.innerText = system.security ? system.security : "none"
  elements.systemPopulation.innerText = formatNumber(system.population)
  
  // console.log("update Location", data, economies);
}

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
   */
  console.log("update Travel State", data)
}

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