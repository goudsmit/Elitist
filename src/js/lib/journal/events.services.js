// ./js/lib/journal/events.services.js
/**
 * -------------------------
 * Api Chapter 8. Station Services
 * -------------------------
 */
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
module.exports = {
  EngineerProgress
}