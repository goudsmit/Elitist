const addMaterialRow = (material) => {
  let template = document.getElementById("materialRow");
  let clone = template.content.cloneNode(true);
  let tr = clone.querySelectorAll("tr");
  tr[0].id = material.cssname + "-row";
  tr[0].classList.add("filter-" + material.type);

  let td = clone.querySelectorAll("td");
  td[0].textContent = material.type[0];
  td[0].id = material.name;
  td[1].textContent = material.name;
  td[2].textContent = material.quantity;
  return clone;
}

const addMaterialToSession = (material) => {
  return new Promise(resolve => {
    if (!Cmdr.session.materials[material.cssname]) {
      Cmdr.session.materials[material.cssname] = {}
      Object.assign(Cmdr.session.materials[material.cssname], material)
      Cmdr.session.materials[material.cssname].quantity = 0
    }    
    resolve(true)
  })
}
exports.addMaterialToSession = addMaterialToSession
/**
 * --------------------
 * updateMaterials function
 * --------------------
 */
exports.updateMaterials = async (material) => {
  let table = document.getElementById("materialTable");
  if (!material) {
    const db = require('../../storage.db');
    let materials = await db.materials.toCollection();
    table.innerHTML = ""
    materials.each((material) => {
      // let row = document.getElementById(material.cssname + "-row");
      // if (!row) {
        let clone = addMaterialRow(material)
        table.append(clone);
      // } else {
      //   var td = row.querySelectorAll("td");
      //   td[2].textContent = material.quantity;
      // }
    });
  } else {
    let row = document.getElementById(material.cssname + "-row");
    if (!row) {
      let clone = addMaterialRow(material)
      table.append(clone);
    } else {
      let td = row.querySelectorAll("td");
      td[2].textContent = material.quantity;
    }
  }
}