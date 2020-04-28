// ./js/lib/live.json.js
const journal = require("../journal");

/**
 * ----------------------------------
 * Elite Dangerous: Process JSON Live Updates
 * ---------------------------------- 
 * When logged into the game these files are updated dynamically.
 * Plugging into this allows for better status of the ship.
 * (See paragraph 13 of the API Docs)
 */

const Status = async function Status(line) {
    // console.log(line)

    // for (flag in FLAGS) {
    //   if (flag & line.Flags) {
    //     console.log(FLAGS[flag]);
    //   }
    // }
    // // let result = { callback: updateGameState, data: {event: line.event} };
    // // return Promise.resolve(result);
};

const FLAGS = {
    1: "Docked", // Landing Pad
    2: "Landed", // Planet Surface
    4: "Landing Gear Down",
    8: "Shields Up",
    16: "Supercruise",
    32: "FlightAssist Off",
    64: "Hardpoints Deployed",
    128: "In Wing",
    256: "LightsOn",
    512: "Cargo Scoop Deployed",
    1024: "Silent Running",
    2048: "Scooping Fuel",
    4096: "Srv Handbrake",
    8192: "Srv Turret",
    16384: "Srv UnderShip",
    32768: "Srv DriveAssist",
    65536: "Fsd MassLocked",
    131072: "Fsd Charging",
    262144: "Fsd Cooldown",
    524288: "Low Fuel", // ( < 25% )
    1048576: "Over Heating", // ( > 100% )
    2097152: "Has Lat Long",
    4194304: "IsInDanger",
    8388608: "Being Interdicted",
    16777216: "In MainShip",
    33554432: "In Fighter",
    67108864: "In SRV "
}
module.exports = { Status }