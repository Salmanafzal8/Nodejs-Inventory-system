const fs = require("fs");

const { loadInventory } = require("./addItem");
const { clear } = require("console");

let inventory = loadInventory();

function exportCsv(inventory) {
 if (!inventory || inventory.length === 0){
    console.log("No data to export.")
    return
 }

  let csv = "";
  const headers = Object.keys(inventory[0]);
  csv += headers.join(",") + "\n";

  inventory.forEach((obj) => {
    const values = headers.map((header) => obj[header]);
    csv += values.join(",") + "\n";
  });

  fs.writeFile("inventory.csv", csv, "utf-8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Conversion successful. CSV file created.");
    clear
  });
}

module.exports = exportCsv;
