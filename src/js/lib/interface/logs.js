const interface = require('../interface');
const elements = require("./elements");
const journal = require('../journal')

const getLogEntryTemplate = () => {
  // <div class="log-entry">
  //   <div class="icon"></div>
  //   <div class="event"></div>
  // </div>
  let template = document.createElement("div");
  template.classList.add("log-entry");
  let iconDiv = document.createElement("div");
  iconDiv.classList.add("icon");
  template.appendChild(iconDiv);
  let eventDiv = document.createElement("div");
  eventDiv.classList.add("event");
  template.appendChild(eventDiv);
  return template;
};

/**
 * --------------------
 * updateLog function
 * 
 * This is a long switch-statement
 * --------------------
 */
exports.updateLog = async (data) => {
  let logEntry = getLogEntryTemplate();
  let divIcon = logEntry.querySelector(".icon");
  let divEvent = logEntry.querySelector(".event");
  switch (data.event) {
    case "ApproachBody":
      divEvent.innerText = `Approaching ${data.Body}`;
      divEvent.classList.add("log-travel");
      break;
    case "ApproachSettlement":
      divEvent.innerText = `Approaching Settlement: ${data.settlement}`;
      break;
    case "Bounty":
      divEvent.innerText = `Bounty rewarded: ${formatNumber(
        data.TotalReward
      )}cr`;
      divEvent.classList.add("highlight");
      break;
    case "BuyAmmo":
      interface.setCredits(data.Cost, "SUBSTRACT")
      divEvent.innerText = `Ammo restocked`
      divEvent.classList.add('info')
      break;
    case "CodexEntry":
      if (data.IsNewEntry) {
        divEvent.innerText = `Discovery!\n${data.Category_Localised} > ${data.SubCategory_Localised} > ${data.Name_Localised}`
        divEvent.classList.add("primary")
      }
      break;
    case "CommitCrime":
      let crimeMsg = `Crime commited... ${data.CrimeType}`
      if (data.CrimeType == "collidedAtSpeedInNoFireZone") {
        crimeMsg = `High Speed collision in No fire zone! Fined <span class="credits">${interface.formatNumber(data.Fine)}cr</span>!`
      }
      divEvent.innerHTML = crimeMsg
      divEvent.classList.add("danger")
      break
    case "Died":
      interface.fullScreenFlash()
      interface.setShipHealth(0)
      divEvent.innerText = `You are dead!`
      divEvent.classList.add("danger")
      break;
    case "DockingDenied":
      divEvent.innerText = `Docking request denied with reason: ${data.Reason}`;
      divEvent.classList.add("danger")
      break;
    case "DockingGranted":
      divEvent.innerText = `Docking permitted: pad ${data.LandingPad}`;
      divEvent.classList.add("log-travel");
      break;
    case "DockingRequested":
      divEvent.innerText = `Docking requested at ${data.StationName}`;
      divEvent.classList.add("log-travel");      
      break;
    case "EscapeInterdiction":
      divEvent.innerText = `Escaped Interdiction`
      divEvent.classList.add("success");
      break;
    case "DockingRequested":
      divEvent.innerText = `Requested docking at ${data.StationName}`;
      break;
    case "Fileheader":
      divEvent.innerText = `----- New gaming session started -----`
      break;
    case "Friends":
      divEvent.innerText = `friend ${data.Status}: ${data.Name}`;
      divEvent.classList.add("info");
      break;
    case "FSDJump":
      divEvent.innerText = `Arrival in ${data.StarSystem}`
      divEvent.classList.add("log-travel")
      break;
    case "FSSDiscoveryScan":
      divEvent.innerText = `honk: ${data.BodyCount} bodies & ${data.NonBodyCount} non bodies (${Math.round(data.Progress*100)}%)`
      divEvent.classList.add("info")
      break;
    case "FuelScoop":
      interface.setFuelLevel(data.Total)
      divEvent.innerText = `Scooped ${Math.round(data.Scooped*100)/100} tons of fuel`
      divEvent.classList.add("info")
      break;
    case "HeatDamage":
      interface.fullScreenFlash()
      divEvent.innerText = `warning: heat damage!`
      divEvent.classList.add("danger")
      break;      
    case "HeatWarning":
      divEvent.innerText = `warning: High Heat!`
      divEvent.classList.add("warning")
      break;
    case "HullDamage":
      let msg
      if (data.PlayerPilot) {
        interface.fullScreenFlash()
        interface.setShipHealth(data.Health)
        msg = `Ship taking damage!`
      } else {
        msg = `Fighter taking damage`
      }
      divEvent.innerText = msg;
      divEvent.classList.add("danger")
      break;
    case "LeaveBody":
      divEvent.innerText = `Leaving  ${data.Body}`;
      divEvent.classList.add("log-travel");
      break;
    case "LoadGame":
      divEvent.innerText = `----- Game loaded -----`;
      break;
    case "MarketBuy":
      interface.setCredits(data.TotalCost, "SUBSTRACT");
      let marketBuyItem = data.Type_Localised ? data.Type_Localised : data.Type
      divEvent.innerHTML = `Purchased ${marketBuyItem} for <span class="credits">${interface.formatNumber(data.TotalCost)}cr</span>`
      divEvent.classList.add("success")
      break;
    case "MarketSell":
      interface.setCredits(data.TotalSale);
      let marketSellItem = data.Type_Localised ? data.Type_Localised : data.Type
      divEvent.innerHTML = `Sold ${marketSellItem} for <span class="credits">${interface.formatNumber(data.TotalSale)}cr</span>`
      divEvent.classList.add("success")      
      break;
    case "MaterialDiscovered":
      let materialName =
          data.Category === "Raw" ? data.Name : data.Name_Localised
      divEvent.innerText = `New discovery (${data.DiscoveryNumber})!\n ${materialName}`
      divEvent.classList.add("primary")
      break;
    case "MiningRefined":
      let refinedItem = data.Type_Localised ? data.Type_Localised : data.Type
      divEvent.innerText = `Refined 1x ${refinedItem}`
      divEvent.classList.add("log-trade")
      break;
    case "ModuleBuy":
      let realCosts = data.SellPrice == undefined ? data.BuyPrice : data.BuyPrice-data.SellPrice
      interface.setCredits(realCosts, "SUBSTRACT")
      divEvent.innerText = `new ${data.BuyItem_Localised} Purchased `
      divEvent.classList.add("highlight");
      break;
    case "ModuleRetrieve":
      let retrievedModule = data.RetrievedItem_Localised ? data.RetrievedItem_Localised : data.RetrievedItem
      let swapOutModule = data.SwapOutItem_Localised ? data.SwapOutItem_Localised : data.SwapOutItem
      divEvent.innerText = `swapped ${swapOutModule} for ${retrievedModule}`
      divEvent.classList.add("highlight");
      break;
    case "MultiSellExplorationData":
      interface.setCredits(data.TotalEarnings)
      let systemsDiscovered = data.Discovered.length
      let bodiesDiscovered = 0
      data.Discovered.forEach(body => bodiesDiscovered += body.NumBodies)
      divEvent.innerHTML = `exploration data sold for <span class="credits">${interface.formatNumber(data.TotalEarnings)}cr</span><br>(${systemsDiscovered} systems, ${bodiesDiscovered} bodies)`
      divEvent.classList.add("success");
      break;
    case "Promotion":
      let promoteMsg = ""
      for (let key of Object.keys(data)) {
        if (key in journal.RANKS) {
          promoteMsg = `${key} rank promoted to ${journal.RANKS[key][data[key]]}`
        }
      }
      divEvent.innerText = promoteMsg
      divEvent.classList.add("info")
      break;
    case "RedeemVoucher":
      interface.setCredits(data.Amount)
      divEvent.innerText = `Redeemed bounties: ${interface.formatNumber(data.Amount)}cr`
      divEvent.classList.add("highlight");
      break;
    case "RefuelAll":
      interface.setFuelLevel()
      interface.setCredits(data.Cost, "SUBSTRACT")
      divEvent.innerHTML = `refueled all for <span class="credits">${interface.formatNumber(data.Cost)}cr</span>`;
      divEvent.classList.add("success");
      break;
    case "Repair":
      interface.setCredits(data.Cost, "SUBSTRACT") 
      divEvent.innerHTML = `Ship ${data.Item} repaired for <span class="credits">${interface.formatNumber(data.Cost)}cr</span>`;
      divEvent.classList.add("success");
      break;
    case "RepairAll":
      interface.setCredits(data.Cost, "SUBSTRACT")
      interface.setShipHealth(1)
      divEvent.innerHTML = `All ship modules repaired for <span class="credits">${interface.formatNumber(data.Cost)}cr</span>`
      divEvent.classList.add("success")
      break;
    case "Resurrect":
      interface.setShipHealth(1)
      interface.setCredits(data.Cost, "SUBSTRACT")
      divEvent.innerText = `Welcome back cmdr...`
      divEvent.classList.add("success")
      break;
    case "SAAScanComplete":
      divEvent.innerText = `surface scan ${data.BodyName} complete`
      divEvent.classList.add("log-exploration")
      break;
    case "Scanned":
      divEvent.innerText = `${data.ScanType} scan detected!`;
      divEvent.classList.add("warning");      
      break;
    case "SellExplorationData":
      interface.setCredits(data.TotalEarnings);
      divEvent.innerText = `Exploration data sold for <span class="credits">${interface.formatNumber(data.TotalEarnings)}cr</span>`
      divEvent.classList.add("success");
      break;
    case "SetUserShipName":
      elements.shipName.innerText = data.UserShipName
      elements.shipId.innerText = data.UserShipId
      divEvent.innerText = `Renamed ship/id: ${data.UserShipName} (${data.UserShipId})`
      divEvent.classList.add("primary");
      break;
    case "ShipyardBuy":
      interface.setCredits(data.ShipPrice, "SUBSTRACT")
      const getShipType = require('../journal').getShipType
      divEvent.innerText = `New Ship purchased: ${getShipType(data.ShipType)}`
      divEvent.classList.add("highlight")
      break;
    case "Shutdown":
      divEvent.innerText = `\n ----- Exiting game -----`
      break;
    case "StartJump":
      divEvent.innerText = `Traveling to ${data.StarSystem}`
      divEvent.classList.add("log-travel");
      break;
    case "SupercruiseEntry":
      divEvent.innerText = "Entering Supercruise";
      divEvent.classList.add("log-travel");
      break;
    case "SupercruiseExit":
      divEvent.innerText = `Exiting Supercruise at ${data.Body}`
      divEvent.classList.add("log-travel")
      break;
    case "StartJump":
      break;
    case "Scanned":
      divEvent.innerText = `${data.ScanType} scan detected!`;
      divEvent.classList.add("warning");
      break;
    case "UnderAttack":
      divEvent.innerText = "Under attack!";
      divEvent.classList.add("danger");
      break;
    default:
      console.log("logEntry: ", data);
      break;
  }
  elements.journalLog.insertBefore(logEntry, elements.journalLog.firstChild);
};