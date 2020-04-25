// ./js/lib/events.trade.js
const journal = require("../journal");

// Api manual chapter 7: Trade
const AsteroidCracked = async function AsteroidCracked(line) {
  return;
};
const BuyTradeData = async function BuyTradeData(line) {
  console.log(line);
};
const CollectCargo = async function CollectCargo(line) {
  return;
};
const EjectCargo = async function EjectCargo(line) {
  // I really need to do something useful with Cargo
  return;
};
const MarketBuy = async function MarketBuy(line) {
  Cmdr.credits -= line.TotalCost
  Cmdr.Save()

  let purchase = {
    event: line.event,
    type: line.Type_Localised,
    quantity: line.Count,
    price: line.BuyPice
  }
  let result = { callback: updateToast, data: purchase}
  return Promise.resolve(result)
};
const MarketSell = async function MarketSell(line) {
  Cmdr.credits += line.TotalSale
  Cmdr.Save()

  let sale = {
    event: line.event,
    type: line.Type_Localised,
    quantity: line.Count,
    price: line.SellPrice
  }
  let result = { callback: updateToast, data: sale}
  return Promise.resolve(result)
};
const MiningRefined = async function MiningRefined(line) {
  result = {
    callback: updateToast,
    data: { event: line.event, type: line.Type_Localised },
  };
  return Promise.resolve(result);
};

module.exports = {
  AsteroidCracked,
  CollectCargo,
  EjectCargo,
  MarketBuy,
  MarketSell,
  MiningRefined
};
