const elements = require('./elements');
const journal = require('../journal');

const setRank = (rank) => {
  const RANKS = journal.RANKS
  let valDiv = elements[rank.type.toLowerCase()+"Rank"]
  valDiv.innerText = RANKS[rank.type][rank.level]
  let progressBar = elements[rank.type.toLowerCase()+"Progress"]
  progressBar.value = rank.progress
  if (RANKS[rank.type][rank.level] === "Elite") {
    valDiv.classList.add("elite")
    progressBar.classList.add("elite")
  }
}

exports.updateRanks = async (rank) => {
  if (!rank) {
    await db.ranks.each(rank => {
      setRank(rank)
    })
  } else {
    for (let key of Object.keys(rank)) {
      if (key in journal.RANKS) {
        await db.ranks.get({type: key}, rank => {
          setRank(rank)
        })        
      }
    }
  }
}