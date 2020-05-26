const elements = require('./elements');

/**
 * --------------------
 * Body template
 * --------------------
 */
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
/**
 * --------------------
 * Is the body already defined in the document?
 * --------------------
 */
const bodyExists = (id) => {
  let element = document.getElementById(id);
  return elements.systemBodies.contains(element);
};

/**
 * --------------------
 * Properties
 * --------------------
 */
const addProperty = (property) => {
  let template = document.createElement("div");
  template.classList.add("property");
  if (property) {
    template.classList.add(property);
  }
  return template;
}
/**
 * --------------------
 * Property: Gravity
 * --------------------
 */
const setGravityProperty = (gravity) => {
  let template = addProperty();
  if (gravity < 1) {
    template.classList.add("gravity-low");
  } else if (gravity > 1 && gravity < 2.5) {
    template.classList.add("gravity-medium");
  } else {
    template.classList.add("gravity-high");
  }
  template.innerText = `${Math.round(gravity*10)/10}g`
  return template;
};

/**
 * --------------------
 * Put together the body to return
 * --------------------
 */
const addBody = (body) => {
  let template = getBodyTemplate();
  template.classList.add(getShortBodyType(body.type));
  template.id = body.id;
  let divBodyId = template.querySelector(".id");
  let shortBodyClass =
    body.type == "Planet"
      ? getShortPlanetClass(body.class)
      : body.type == "Star"
      ? body.class
      : body.type == "Asteroid Belt"
      ? "belt"
      : body.type;
  divBodyId.innerHTML = `<span class="stellar type-${shortBodyClass}"></span>`;
  let divBodyName = template.querySelector(".name");
  divBodyName.innerText = body.name;
  let divBodyType = template.querySelector(".type");
  divBodyType.innerText =
    body.class && body.type == "Star"
      ? `${body.class} class star `
      : body.class && body.type == "Planet"
      ? body.class
      : body.type;
  let properties = [];
  if (body.extended) {
    if (body.extended.atmosphere) {
      let atmosphereProperty = addProperty();
      atmosphereProperty.innerText = body.extended.atmosphere;
      properties.push(atmosphereProperty);
    }
    if (body.extended.volcanism) {
      let volcanismProperty = addProperty();
      volcanismProperty.innerText = body.extended.volcanism;
      properties.push(volcanismProperty);
    }
  }
  if (body.landable) {
    let landableProperty = addProperty();
    landableProperty.classList.add("landable");
    landableProperty.innerText = "landable";
    properties.push(landableProperty);
  }
  if (body.gravity) {
    let gravityProperty = setGravityProperty(body.gravity);
    properties.push(gravityProperty);
  }
  if (properties.length > 0) {
    let divBodyProperties = template.querySelector(".properties");
    divBodyProperties.style.display = "flex";
    properties.forEach((property) => divBodyProperties.appendChild(property));
  }

  elements.systemBodies.appendChild(template);
};

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
    if (!bodyExists(body.id)) {
      addBody(body)
    }
  }
}