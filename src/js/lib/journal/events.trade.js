// ./js/lib/journal/events.trade.js
/**
 * -------------------------
 * Api Chapter 7. Trade
 * -------------------------
 */
const interface = require('../interface');

const AsteroidCracked = (line) => Promise.resolve(true)
// TODO: Cargo I will sort 'last', some day
const CollectCargo = (line) => Promise.resolve(true)
const EjectCargo = (line) => Promise.resolve(true)
const MarketBuy = (line) => {
  return new Promise(resolve => {
    Cmdr.credits -= line.TotalCost
    result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result);
  })
}
const MarketSell = (line) => {
  return new Promise(resolve => {
    Cmdr.credits += line.TotalCost
    result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result);
  })  
}
const MiningRefined = (line) => {
  return new Promise(resolve => {
    // TODO: CARGO!!
    result = {callback: interface.updateLog, data: Object.assign({}, line)}
    resolve(result);    
  })
}

module.exports = {
  AsteroidCracked,
  CollectCargo,
  EjectCargo,
  MarketBuy,
  MarketSell,
  MiningRefined
}