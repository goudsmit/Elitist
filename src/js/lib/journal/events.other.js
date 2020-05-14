// ./js/lib/journal/events.other.js
/**
 * -------------------------
 * Api Chapter 11. Other Events
 * -------------------------
 */
const ui = require('../../ui.updates');

const ApproachSettlement = (line) => {
    return Promise.resolve(true)
}

const Music = (line) => {
    return Promise.resolve(true)
}
const Shutdown = (line) => {
    return new Promise(resolve => {
        if (elitist.cmdr) { cmdr.Save() }
        db.logs.update(fileName, {shutdown: true})
        lineSeq = 0        
        let result = { callback: ui.updateGameState, data: {event: line.event}};
        resolve(result);
    })
}
module.exports = {
    ApproachSettlement,
    Music,
    Shutdown
}