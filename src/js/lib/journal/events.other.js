// ./js/lib/journal/events.other.js
/**
 * -------------------------
 * Api Chapter 11. Other Events
 * -------------------------
 */
const ui = require('../../ui.updates');

const ApproachSettlement = (line) => {
    // TODO: Log
    return Promise.resolve(true)
}
const FuelScoop = (line) => {
    result = {callback: ui.updateFuel, data: Object.assign({}, line)}
    return Promise.resolve(result)
}
const Music = (line) => {
    return Promise.resolve(true)
}
const ReceiveText = (line) => {
    // console.log(line)
    // TODO: toasts?
    return Promise.resolve(true)
}
const Shutdown = (line) => {
    return new Promise(resolve => {
        if (elitist.cmdr) { Cmdr.Save() }
        db.logs.update(fileName, {shutdown: true})
        lineSeq = 0        
        let result = { callback: ui.updateGameState, data: {event: line.event}};
        resolve(result);
    })
}
module.exports = {
    ApproachSettlement,
    FuelScoop,
    Music,
    ReceiveText,
    Shutdown
}