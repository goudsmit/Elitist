const elements = require('./ui.elements')

exports.updateOverlay = async (state) => {
  switch (state) {
    case "LoadUI":
      // elements.overlay.style.display = "none"
      elements.overlay.classList.add("fade-out");
      elements.overlay.addEventListener("animationend", (ev) => {
        elements.overlay.style.display = "none"
        elements.appContainer.style.display = "flex"
      });
      elements.appContainer.classList.add("fade-in")
      elements.appContainer.addEventListener("animationend", (ev) => {
        elements.appContainer.style.display = "flex"
      })
      break;
  
    default:
      elements.overlay.style.display = "flex"
      break;
  }
}


const updateGameState = async (data) => {
  // function timeout(ms) {
  //     return new Promise(resolve => setTimeout(resolve, ms));
  // }
  // await timeout(3000);
  // console.log("update Game State after 3 seconds")
  let status;
  switch (data.event) {
    case "LoadGame":
      status = "online"
      css = "online"
      break;
    case "Fileheader":
      status = "initialising"
    default:
      status = "offline"
      css = "offline"
      break;
  }
  elements.gameStatus.classList.remove()
  elements.gameStatus.innerText = status
  console.log("update Game State", data);
};
exports.updateGameState = updateGameState;

const updateShip = async (data) => {
  console.log("update Ship", data);
};
exports.updateShip = updateShip;

const updateMaterials = async () => {
  console.log("update Materials");
};
exports.updateMaterials = updateMaterials;

const updateRank = async (rank) => {
  console.log("update Rank/ All Ranks Level or Progress");
};
exports.updateRank = updateRank;
