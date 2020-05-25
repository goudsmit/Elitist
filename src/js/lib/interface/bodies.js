const elements = require('./elements');

const getBodyTemplate = () => {
// <div class="body">
  //   <div class="id center">id</div>
  //   <div class="details right">
  //     <div class="name">name</div>
  //     <div class="type">type</div>
  //     <div class="properties" style="display: none">properties</div>
  //     <div class="materials" style="display: none">materials</div>
  //   </div>
  // </div>
  // Parent
  let template = document.createElement("div");
  template.classList.add("body");
  let divBodyId = document.createElement("div");
  divBodyId.classList.add("id", "center");
  template.appendChild(divBodyId);
  let divBodyDetail = document.createElement("div");
  divBodyDetail.classList.add("details", "right");
  let divBodyName = document.createElement("div");
  divBodyName.classList.add("name");
  divBodyName.innerText = "Name"
  divBodyDetail.appendChild(divBodyName);
  let divBodyType = document.createElement("div");
  divBodyType.classList.add("type");
  divBodyDetail.appendChild(divBodyType);
  let divBodyProperties = document.createElement("div");
  divBodyProperties.classList.add("properties");
  divBodyProperties.style.display = "none"
  divBodyDetail.appendChild(divBodyProperties);
  let divBodyMaterials = document.createElement("div");
  divBodyMaterials.classList.add("materials");
  divBodyMaterials.style.display = "none"
  divBodyDetail.appendChild(divBodyMaterials);
  template.appendChild(divBodyDetail);
  return template;
}

// Body Helper Functions
const getShortBodyType = (bodyType) => {
  if (bodyType == 'Asteroid Belt') {
    return 'belt'
  }
  return bodyType.toLowerCase()
}
const getShortPlanetClass = (planetClass) => {
  if (planetClass == "High metal content body") {
    return "hmc"
  } else if (planetClass == "Metal rich body") {
    return "mr"
  } else if (planetClass == "Earthlike body") {
    return "elw"
  } else if (planetClass == "Water world") {
    return "ww"
  } else if (planetClass == "Ammonia world") {
    return "aw"
  } else {
    return "other-planet"
  }
}
const bodyExists = (id) => {
  let element = document.getElementById(id);
  return elements.systemBodies.contains(element);
};
const addBody = (body) => {
  let template = getBodyTemplate()
  template.classList.add(getShortBodyType(body.type))
  template.id = body.id
  let divBodyId = template.querySelector(".id");
  let shortBodyClass = (body.type == "Planet") ? getShortPlanetClass(body.class) : (body.type == "Star") ? body.class : (body.type == "Asteroid Belt") ? "belt" : body.type
  divBodyId.innerHTML = `<span class="stellar type-${shortBodyClass}"></span>`
  let divBodyName = template.querySelector(".name");
  divBodyName.innerText = body.name
  let divBodyType = template.querySelector(".type");
  divBodyType.innerText =
    body.class && body.type == "Star"
      ? `${body.class} class star `
      : body.class && body.type == "Planet"
      ? body.class
      : body.type;

  elements.systemBodies.appendChild(template)
}

/**
 * --------------------
 * updateBodies function
 * --------------------
 */
exports.updateBodies = async (body) => {
  if (!body) {
    await db.bodies.where({ address: Cmdr.location.address }).each((body) => {
      if (!bodyExists(body.id)) {
        addBody(body)
      }
    })
  } else {
    addBody(body)
  }
}