const fs = require("fs");
const readline = require("readline");

const INVENTORY_FILE = "inventory.json";

function loadInventory() {
  if (!fs.existsSync(INVENTORY_FILE)) {
    fs.writeFileSync(INVENTORY_FILE, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(INVENTORY_FILE, "utf-8"));
}
function saveInventory(data) {
  fs.writeFileSync(INVENTORY_FILE, JSON.stringify(data, null, 2));
}

function updateItem() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Item ID to update:", (id)=>{
  const numericId = parseInt(id)
  let inventory = loadInventory()
  
  })
}
