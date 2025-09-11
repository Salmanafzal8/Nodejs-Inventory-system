const { loadInventory } = require("./addItem");

let inventory = loadInventory();

function viewInventory(inventory) {
  let csv = "";
  const headers = Object.keys(inventory[0]);
  csv += headers.join("           ") + "\n";
  inventory.forEach((obj) => {
    const values = headers.map((header) => obj[header]);
    csv += values.join("          ") + "\n";
  });
  console.log("========= Total inventory ==========");
  console.log(csv);

  return csv;
}
module.exports = viewInventory;
