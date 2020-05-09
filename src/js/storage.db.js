const Dexie = require('dexie');
const db = new Dexie('elitist');

db.version(1).stores({
  logs: '&file.name, part, gameversion, build, shutdown',
  cmdr: 'name, ship, credits, location.address, location.docked',
  ships: '&id, name, type, ident, fuel.level, fuel.capacity, hull.value, hull.health, modules.value, mass, cargo.capacity, jumprange.max, rebuy',
  ranks: '&type, level, progress',
  reputations: '&faction, level',
  engineers: '&id, name, progress, rankprogress, rank',
  systems: '&address, name, position, allegiance, government, economy.first, economy.second, security, population, visited',
  bodies: '[address+id], address, name, type, class, parents, landable, gravity, rings, materials, discovered, mapped',    
  materials: '&name, type, quantity, source'
})

db.open().then(function() {
  let journal = require('./journal')
  // First time use: RANKS
  db.ranks.count().then(function(count) {
      let RANKS = journal.RANKS
      if (count == 0) {
          for (rank in RANKS) { db.ranks.add({type: rank}) }
      }
  })
  // First time use: FACTIONS
  db.reputations.count().then( function(count) {
      let FACTIONS = journal.FACTIONS
      if (count == 0) {
          for (i in FACTIONS) { db.reputations.add({faction: FACTIONS[i]})}
      }
  })
}).catch (function (err) {
  console.error('Failed to open db: ' + (err.stack || err));
});

module.exports = db