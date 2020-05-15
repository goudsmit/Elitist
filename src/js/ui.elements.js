exports.overlay = document.getElementById("overlay");
exports.overlayMsg = document.getElementById("overlayMsg");
exports.appContainer = document.getElementById("appContainer");
exports.gameStatus = document.getElementById("gameStatus");
exports.cmdrName = document.getElementById("cmdrName");
exports.cmdrVessel = document.getElementById("cmdrVessel");
exports.cmdrCredits = document.getElementById("cmdrCredits");
exports.shipName = document.getElementById("shipName");
exports.shipId = document.getElementById("shipId");
exports.shipType = document.getElementById("shipType");
exports.shipValue = document.getElementById("shipValue");
exports.shipHealth = document.getElementById("shipHealth");
exports.shipRebuy = document.getElementById("shipRebuy");
exports.shipFuel = document.getElementById("shipFuel");
exports.shipFuelNumbers = document.getElementById("shipFuelNumbers");
exports.shipFuelLevelBar = document.getElementById("shipFuelLevelBar");
exports.exploreRank = document.getElementById("exploreRank");
exports.exploreProgress = document.getElementById("exploreProgress");
exports.tradeRank = document.getElementById("tradeRank");
exports.tradeProgress = document.getElementById("tradeProgress");
exports.combatRank = document.getElementById("combatRank");
exports.combatProgress = document.getElementById("combatProgress");
exports.federationRank = document.getElementById("federationRank");
exports.federationProgress = document.getElementById("federationProgress");
exports.empireRank = document.getElementById("empireRank");
exports.empireProgress = document.getElementById("empireProgress");
// CARGO
exports.cargoEmpty = document.getElementById("cargoEmpty");
exports.cargoPresent = document.getElementById("cargoPresent");
exports.travelPanels = document.getElementById("travelPanels");
exports.travelOverlay = document.getElementById("travelOverlay");
exports.fsdDestination = document.getElementById("fsdDestination");
exports.fsdDestinationDetails = document.getElementById("fsdDestinationDetails");
// SYSTEM
exports.dockPanel = document.getElementById("dockPanel");
exports.dockPanelBody = document.getElementById("dockPanelBody");
exports.fsdTarget = document.getElementById("fsdTarget")
exports.dockingStatus = document.getElementById("dockingStatus");
exports.systemName = document.getElementById("systemName");
exports.systemAllegiance = document.getElementById("systemAllegiance");
exports.systemGovernment = document.getElementById("systemGovernment");
exports.systemEconomies = document.getElementById("systemEconomies");
exports.systemSecurity = document.getElementById("systemSecurity");
exports.systemPopulation = document.getElementById("systemPopulation");

// DOCK
exports.bodyName = document.getElementById("bodyName");
exports.bodyType = document.getElementById("bodyType");
exports.bodyAllegiance = document.getElementById("bodyAllegiance");
exports.bodyGovernment = document.getElementById("bodyGovernment");
exports.bodyEconomies = document.getElementById("bodyEconomies");
exports.bodyFaction = document.getElementById("bodyFaction");
exports.bodyServices = document.getElementById("bodyServices");
exports.bodyServiceTemplate = document.getElementById("bodyService")

// BODIES
exports.systemBodies = document.getElementById("systemBodies");
exports.getBodyTemplate = () => {
  // <div class="body">
  //           <div class="id center">id</div>
  //           <div class="details right">
  //             <div class="name">name</div>
  //             <div class="type">type</div>
  //             <div class="properties">properties</div>
  //             <div class="materials">materials</div>
  //           </div>
  //         </div>
  // Parent
  let template = document.createElement("div");
  template.classList.add("body");
  let divBodyId = document.createElement("div");
  divBodyId.classList.add("id", "center");
  template.appendChild(divBodyId);
  let divBodyDetail = document.createElement("div");
  divBodyDetail.classList.add("details", "right");
  let divBodyName = document.createElement("div");
  divBodyName.classList.add("name");
  divBodyDetail.appendChild(divBodyName);
  let divBodyType = document.createElement("div");
  divBodyType.classList.add("type");
  divBodyDetail.appendChild(divBodyType);
  let divBodyProperties = document.createElement("div");
  divBodyProperties.classList.add("properties");
  divBodyDetail.appendChild(divBodyProperties);
  let divBodyMaterials = document.createElement("div");
  divBodyMaterials.classList.add("materials");
  divBodyDetail.appendChild(divBodyMaterials);
  template.appendChild(divBodyDetail);
  return template;
}
exports.getSignalTemplate = () => {
  //
}

exports.getDockingRequest = (req) => {
  let template = document.createElement("div");
  template.classList.add("panel");
  template.innerText = "docking request"
  return template;
} 