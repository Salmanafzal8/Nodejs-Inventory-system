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

function deleteItem() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the product id:", (id) => {
    const numericId = parseInt(id);
    let inventory = loadInventory();
    const initialLength = inventory.length;
    inventory = inventory.filter((item) => item.id !== numericId);

    if (inventory.length === initialLength) {
      console.log(`No item found with the id ${numericId}`);
    } else {
      saveInventory(inventory);
      console.log(`Item with the id ${numericId} is succesfully deleted`);
    }
    rl.close()
  });
}
module.exports = deleteItem;
