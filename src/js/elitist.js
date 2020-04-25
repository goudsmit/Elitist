const db = require('./js/storage.db')
const journal = require('./js/journal')

const util = require("util");
const fs = require("fs");
const os = require("os");
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const path = require("path");
const ipc = require("electron").ipcRenderer;

/**
 * ----------------------------------
 * Elitist: localStorage functions
 * ----------------------------------
 */
const initLocalStorage = function initLocalStorage() {
  if (!localStorage.getItem("elitist")) {
    var setup = {
      cmdr: null,
      folder: {
        logs: null,
      },
    };
    localStorage.setItem("elitist", JSON.stringify(setup));
    location.reload();
  }
};
const clearLocalStorage = function clearLocalStorage() {
  if (localStorage.getItem("elitist")) {
    localStorage.removeItem("elitist");
  }
};



/**
 * ----------------------------------
 * Elitist: EventProcessor
 * Processes events created by Elite: Dangerous Journal API
 * API Version Supported: v3.7
 * ----------------------------------
 */
var EventProcessor = async (line) => {
  return new Promise((resolve, reject) => {
    line = JSON.parse(line)
    event = line.event
    if (typeof(journal[event]) == 'function') {
      journal[event](line).then( (result) => {
        resolve(result)
      })
    } else {
      console.log(`${event} function not supported (yet)`);
    }
  })
}

/**
 * ----------------------------------
 * Elitist: Read Journal Folder
 * ----------------------------------
 */
 async function readFolder(folder) {
  let files = await readdir(folder)
  for (let file of files) {
    let stats = await stat(folder + path.sep + file);
    if (stats.isFile()) {
      if (file.endsWith('.log')) {
        let log = await db.logs.get(file)
        if (log == undefined || !(log.shutdown)) {
          await readFile(folder, file)
        }        
      }
    }
  }
}

/**
 * ----------------------------------
 * Elitist: Read Journal Folder
 * ----------------------------------
 */
var lineNumber = 0
var readFile = async (folder, file) => {
  const readline = require('readline');
  // var counter = 0
  const readInterface = readline.createInterface({
      input: fs.createReadStream(folder + path.sep + file)
  });
  readInterface.on('line', async (line) => {
    // counter++
    // if (counter >= lineNumber) {
    fileName = file
    lineNumber++
    // console.log(lineNumber, line)
    await EventProcessor(line).then(
      (result) => { 
        if (result) {
          ResultProcessor(result)
        }
      }
    )
    .catch( (error) => { 
      // console.log("Readfile Error: ", error) 
    })
    // }
  })
}

/**
 * ----------------------------------
 * Elitist: ResultProcessor
 * ----------------------------------
 */
const ResultProcessor = function ResultProcessor(obj) {
  // // console.log(lineNumber, obj)
  // // UI
  // if (obj.ui) {
  //   updateUI(obj.ui)
  // }
  // // Log
  // if (obj.log) {
  //   $(`<div class="${obj.log.cssName}"><i class="fa fa-${obj.log.icon}"></i> ${obj.log.msg}</div>`).prependTo("#appLog .card-body").hide().slideDown()
  // }
  // Process Callbacks
  if (obj.callback) {
    if (typeof obj.callback == 'function') {
      data = (obj.data == undefined) ? null : obj.data
      obj.callback(data)
    }
  }
}
/**
 * ----------------------------------
 * Elitist: Update UI Elements
 * ----------------------------------
 */
const updateGameState = async function updateGameState(data) {
  // console.log("updateGameState()")
}
const updateCmdr = async function updateCmdr() {
  // console.log("updateCmdr()")
}
const updateShip = async function updateShip() {
  // console.log("updateShip()")
}
const updateRank = async function updateRank(data) {
  /**
   * Callbacks:
   * No data: General update
   * Event: Promotion, data: type & level (Toast after?)
   */
}
const updatePassengers = async function updatePassengers(data) {
  /**
   * Not sure about this yet, but might as wel prepare
   * Event: Passengers, data: Manifest(s)
   */
}
const updateMaterials = async function updateMaterials() {
  // console.log("updateMaterials()")
}
const updateLocation = async function updateLocation(data) {
  // console.log("updateLocation()", data)
}
const updateBodies = async function updateBodies(data) {
  /**
   * Callbacks:
   * No data: General update
   * Event: FSSDiscoveryScan, data: DiscoveryData
   * event: CodexEntry, data: EntryDetails
   */
  // console.log("updateBodies()", data)
}
const updateDock = async function updateDock(data) {
  // If no data : Undock
  // console.log("updateDock()", data)
}
const updateSignals = async function updateSignals(data) {
  // Havent decided what to do with these (Think USS)
  // console.log("updateSignals()")
}
const updateTravelState = async function updateTravelState(data) {
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
  // console.log("updateTravelState()", data)
}
const updateAlertState = async function updateAlertState(data) {
  // For Toast and Alerts: https://www.w3schools.com/howto/howto_js_snackbar.asp
  /**
   * Callbacks from:
   * event: Scanned, data: ScanType
   * event: UnderAttack, data: Target
   * event: HullDamage
   * event: HeatWarning
   * event: HeatDamage
   */
}
const updateToast = async function updateToast(data) {
  /**
   * Callbacks from:
   * event: MultiSellExplorationData, data: DiscoveryData
   * event: MarketBuy, data: PurchaseData
   * event: MarketSell, data: SaleData
   * event: SAAScanComplete, data: ScanData
   * event: ShipyardTransfer, data: TransferDetails
   */
}


/**
 * ----------------------------------
 * Node.js: Events from Main
 * ----------------------------------
 */
ipc.on('start-watcher-reply', (event, args) => {
  console.log(args)
 });

 ipc.on('file-update', async (event, f) => {
  var parts = f.split(path.sep)
  var file = parts.pop()
  var folder = parts.join(path.sep)
  if (file.endsWith('.log')) {
    let log = await db.logs.get(file)
    if (log == undefined || !(log.shutdown)) {
      readFile(folder, file)
      // console.log("File not found in Database, processing!")
    }
  }
  // else if (file.endsWith('.json')) {
  //   let json = file.split(".")[0]
  //   process = new journal.liveJSON()[json]()
  // }
})


 /**
 * ----------------------------------
 * Elitist: Set Up/ Start
 * ----------------------------------
 */
initLocalStorage();
elitist = JSON.parse(localStorage.elitist);

if (elitist.folder.logs == null) {
  var journalDir = (
    os.homedir() + "\\Saved Games\\Frontier Developments\\Elite Dangerous"
  ).replace(/\\/g, "/");
  if (fs.existsSync(journalDir)) {
    elitist.folder.logs = journalDir;
    localStorage.setItem("elitist", JSON.stringify(elitist));
    elitist = JSON.parse(localStorage.elitist);
    location.reload();
  } else {
    // TODO: Set Folder GUI
  }
} else {
  $("#load-messages").text("Starting Watcher")
  ipc.send("start-watcher", elitist.folder.logs);
  $("#load-messages").text("Checking for log files")
  readFolder(elitist.folder.logs).then(() => {
    console.log("Folder Read");
    $("#load-messages").text("Log files checked")
  });
}

 /**
 * ----------------------------------
 * Elitist: Set Commander
 * ----------------------------------
 */
if (elitist.cmdr != null) {
  Cmdr = new journal.Cmdr(elitist.cmdr)
}