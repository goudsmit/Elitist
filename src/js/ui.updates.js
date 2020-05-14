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
  
    default:
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
  let status;
  switch (data.event) {
    case "LoadGame":
      status = "online"
      elements.gameStatus.classList.toggle("online")
      break;
    case "Fileheader":
      status = "initialising"
    default:
      status = "offline"
      css = "offline"
      break;
  }
  elements.gameStatus.classList.remove()
  elements.gameStatus.innerText = status
  console.log("update Game State", data);
};
exports.updateGameState = updateGameState;

const updateShip = async (data) => {
  elements.shipName.innerText = data.name
  elements.shipId.innerText = data.ident
  elements.shipType.innerText = data.type
  elements.shipValue.innerText = data.hull.value ? formatNumber(data.hull.value) : "-"
  elements.shipRebuy.innerText = formatNumber(data.rebuy);
  elements.shipHealth.innerText = Math.round(data.hull.health * 100)
  if (!data.fuel) {
    elements.shipFuel.style.display = "none"
  } else {
    elements.shipFuel.style.display = "flex"
    elements.shipFuelNumbers.innerText = `${data.fuel.level} /${data.fuel.capacity}`
    elements.shipFuelLevelBar.value = data.fuel.level
    elements.shipFuelLevelBar.max = data.fuel.capacity
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
        if (rank.level === 8) {
          elements[rankId].classList.add("elite");
        }
      }
      rankProgress = rank.type.toLowerCase() + "Progress"
      if (elements[rankProgress]) {
        elements[rankProgress].value = rank.progress
        if (rank.level === 8) {
          elements[rankProgress].classList.add("elite")
        }
      }
    })
  }
  // console.log("update Rank/ All Ranks Level or Progress");
};
exports.updateRank = updateRank;


const updateDock = async (dock) => {
  elements.bodyName.innerText = dock.name
  elements.bodyType.innerText = dock.type
  elements.bodyAllegiance.innerText = dock.allegiance ? dock.allegiance : "none"
  elements.bodyGovernment.innerText = dock.government ? dock.government : "none"
  if (dock.economies.length >= 1) {
    let economies = []
    for (let economy of dock.economies) {
      economies.push(economy.Name_Localised)
    }
    elements.bodyEconomies.innerText = economies.join("|");
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
    // elements.bodyServices.innerText = ""
    // let template = document.getElementById("bodyService");
    // console.log(template)
    // for (let service of dock.services) {
    //   const clone = template.content.cloneNode(true);
    //   // var div = clone.querySelectorAll("div");
    //   // div.textContent = service
    //   // bodyServices.append(clone)
    // }
    
  }

  console.log("update Dock", dock)
}
exports.updateDock = updateDock;

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