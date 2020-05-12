const db = require('./js/storage.db');
const journal = require('./js/lib/journal');
const ui = require('./js/ui.updates')

const util = require("util");
const fs = require("fs");
const os = require("os");
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const path = require("path");

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
 * Node.js: Events from Main
 * ----------------------------------
 */
const ipc = require("electron").ipcRenderer;
ipc.on("start-watcher-reply", (event, args) => {
  console.log(args);
});

/**
 * ----------------------------------
 * Function: Date & Time
 * ----------------------------------
 */
var display = setInterval(function () { Time() }, 0);
function Time() {
  var date = new Date();
  var time = date.toLocaleTimeString();
  if (document.getElementById("time")) {
    document.getElementById("time").innerHTML = time;
  }
  // Date
  var options = {
    day: { day: 'numeric' },
    month: {
      long: { month: 'long' },
      short: { month: 'short' }
    }
  }
  var d = new Intl.DateTimeFormat('en-GB', options.day).format(date)
  var m = new Intl.DateTimeFormat('en-GB', options.month.long).format(date)
  var sm = new Intl.DateTimeFormat('en-GB', options.month.short).format(date)
  var y = date.getFullYear() + 1286
  var fulldate = `${d} ${m} ${y}`;
  var shortdate = `${d} ${sm} ${y}`;

  if (document.getElementById("date")) {
    document.getElementById("date").innerHTML = fulldate;
  }
  if (document.getElementById("shortdate")) {
    document.getElementById("shortdate").innerHTML = shortdate;
  }
}


/**
 * ----------------------------------
 * Elitist: Set Up/ Start
 * 
 * Sequence:
 * - Check for defaults, like localStorage setup & journal folder.
 *      if that exists: 
 *          Check files in journal folder & Process
 *          followed by:
 *          Loading UI
 *      else
 *          Show a form to denie the Journal Directory
 * ----------------------------------
 */
const checkFolder = (type) => {
   return new Promise((resolve, reject) => {
    if (elitist.folder[type] == null) {
        switch (type) {
            case 'logs':
                var dir = (
                    os.homedir() + "\\Saved Games\\Frontier Developments\\Elite Dangerous"
                ).replace(/\\/g, "/");
                // OVERRIDE
                dir = "C:/Users/vkuip/Desktop/Elite Log Files";
                break;
            // SCREENSHOTS
            // KEYBINDS
        }
        if (fs.existsSync(dir)) {
            elitist.folder[type] = dir;
            localStorage.setItem("elitist", JSON.stringify(elitist));
            elitist = JSON.parse(localStorage.elitist);
            location.reload();
            resolve()
        } else {
        // TODO: Set Folder Form
        }        
    } else {
        resolve()
    }
   });
}
/**
 * -------------------------
 * Elitist: Check if necessary folder are set.
 * -------------------------
 */
const appSetup = () => {
  return new Promise((resolve, reject) => {
    initLocalStorage();
    elitist = JSON.parse(localStorage.elitist);
    checkFolder("logs")
      .then(() => {
        // Folder present: Start Watcher
        ipc.send("start-watcher", elitist.folder.logs);
      })
      .then(() => {
        resolve();
      });
  });
};


/**
 * ----------------------------------
 * Elitist: Read Journal Folder
 * ----------------------------------
 */
const readFolder = (folder) => {
    readdir(folder).then(async (files) => {
      /**
       * Clean files found in directory.
       * Returns: Only files with .log and 
       *          that are NOT processed in db.logs (shutdown-event)
       */
      let cleanfiles = [];
      files.forEach((file) => {
        if (file.endsWith(".log")) {
          cleanfiles.push(file);
        }
      });
  
      /**
       * Process the files
       */
      for (let i in cleanfiles) {
        let file = cleanfiles[i];
        let stats = await stat(folder + path.sep + file);
        if (stats.isFile()) {
          let index = parseInt(i)+1
          console.log(`${index}: Read File ${file} here`);
          await readFile(file, index).then(() => {
              console.log(`FINISH`)
          })  
        }
      }
    })
    .then( async () => {
        console.log(`Folder contents checked and read`);
        function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        await timeout(3000);
        console.log("3 seconds later")
        // Set up APP constants: CMDR etc
    })
    .then( () => {
        ui.updateOverlay("LoadUI")
        console.log("Load UI")

    });
};


/**
 * ----------------------------------
 * Elitist: Read Journal Folder
 * 
 * After numerous attempts to user readline I gave up
 * Readline can;t for the life of it do asynchronous nicely.
 * Now LineByLineReader thus.
 * ----------------------------------
 */
var fileName
var lineSeq
const readFile = (file, index) => {
  return new Promise((resolve, reject) => {
    fileName = file;
    const LineByLineReader = require("line-by-line");
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    lr = new LineByLineReader(elitist.folder.logs + path.sep + file);
    lineSeq = 0;
    lr.on("error", function (err) {
      reject(error);
    });
    lr.on("line", async (line) => {
      lr.pause();
      line = JSON.parse(line);
      //   console.log(`   ${lineSeq+1}: `, line);

      await EventProcessor(line).then(async (result) => {
        
        //   PostProcess Stuff
        await ResultProcessor(result)
          .then(() => {
            lineSeq += 1;
            lr.resume();
          })
          .catch((error) => {
            console.log(error);
            lineSeq += 1;
            lr.resume();
          });
        // console.log(result);
        // lineSeq += 1
        // lr.resume()
      })
    });
    lr.on("end", () => {
      resolve();
    });
  });
};

/**
 * ----------------------------------
 * Elitist: EventProcessor
 * 
 * Processes events created by Elite: Dangerous Journal API
 * API Version Supported: v3.7
 * ----------------------------------
 */
const EventProcessor = async line => {
    return new Promise(async (resolve) => {
        event = line.event
        if (typeof journal[event] == "function") {
            await journal[event](line).then((result) => {
                resolve(result)
            })
        } else {
            resolve({
                error: `Event: ${event} is not supported (yet)`
            })
        }
    })
}

/**
 * ----------------------------------
 * Elitist: ResultProcessor
 * ----------------------------------
 */
const ResultProcessor = async (obj) => {
    return new Promise((resolve, reject) => {
      if (obj.callback) {
        if (typeof obj.callback == 'function') {
          data = (obj.data == undefined) ? null : obj.data
          obj.callback(data).then( () => {
            resolve()
          })
        }
      } else if (obj.error) {
        reject(obj.error)
      } else {
        resolve()
      }
    })
  }


/**
 * -------------------------
 * Elitist: RUN
 * -------------------------
 */
appSetup().then(() => {
        /**
     * ----------------------------------
     * Elitist: Set Commander
     * ----------------------------------
     */
    if (elitist.cmdr != null) {
        Cmdr = new journal.Cmdr(elitist.cmdr)
        Cmdr.Get()
    }
    readFolder(elitist.folder.logs)
})
