// ./js/lib/journal/events.services.js
/**
 * -------------------------
 * Api Chapter 8. Station Services
 * -------------------------
 */
const ui = require('../../ui.updates');
const CommunityGoal = (line) => Promise.resolve(true)
const CommunityGoalDiscard = (line) => Promise.resolve(true)
const CommunityGoalJoin = (line) => Promise.resolve(true)
const CommunityGoalReward = (line) => Promise.resolve(true)

const EngineerProgress = (line) => {
  return new Promise(resolve => {
    if (line.Engineers) {
      line.Engineers.forEach(async (engineer) => {
        db.engineers
          .get({ id: engineer.EngineerID }, async (e) => {
            if (e == undefined) {
              db.engineers
                .add({ id: engineer.EngineerID, name: engineer.Engineer })
                .catch((error) => {});
            }
          })
          .then(() => {
            db.engineers.update(
              { id: engineer.EngineerID },
              { progress: engineer.Progress }
            );
            if (engineer.Progress == "Unlocked") {
              db.engineers.update(
                { id: engineer.EngineerID },
                { rankprogress: engineer.RankProgress, rank: engineer.Rank }
              );
            }
          });
      });
    } else {
      db.engineers
        .get({ id: line.EngineerID }, async (e) => {
          if (e == undefined) {
            db.engineers
              .add({ id: line.EngineerID, name: line.Engineer })
              .catch((error) => {});
          }
        })
        .then(() => {
          db.engineers.update(
            { id: line.EngineerID },
            { progress: line.Progress }
          );
          if (line.Progress == "Unlocked") {
            db.engineers.update(
              { id: line.EngineerID },
              { rankprogress: line.RankProgress, rank: line.Rank }
            );
          }
        });
    }
    resolve(true)
  })
}

const Market = (line) => Promise.resolve(true);
const Outfitting = (line) => Promise.resolve(true);

const RefuelAll = (line) => {
  return new Promise(resolve => {
    ui.elements.cmdrCredits -= line.Cost
    let result = {callback: ui.updateFuel, data: Object.assign({}, line)}
    resolve(result)
  })
}
const Shipyard = (line) => {
  return Promise.resolve(true)
}
const StoredModules = (line) => {
  return Promise.resolve(true)
}
const StoredShips = (line) => {
  console.log(line)
  return Promise.resolve(true)
}

module.exports = {
  CommunityGoal,
  CommunityGoalDiscard,
  CommunityGoalJoin,
  CommunityGoalReward,
  EngineerProgress,
  Market,
  Outfitting,
  RefuelAll,
  Shipyard,
  StoredModules,
  StoredShips
}