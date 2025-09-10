const fs = require("fs/promises");
const readline = require("readline");
const { saveInventory, loadInventory } = require("./addItem");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (str) => new Promise((resolve) => rl.question(str, resolve));

async function addItem() {
  const inventory = await loadInventory();
  const newItem = {
    id: inventory.length > 0 ? inventory[inventory.length - 1].id + 1 : 1,
  };

  newItem.name = await question("Enter a product name: ");
  newItem.category = await question("Enter category: ");
  newItem.quantity = parseInt(await question("Enter quantity: "), 10);
  newItem.price = parseFloat(await question("Enter price: "));
  newItem.minStockLevel = parseInt(
    await question("Enter minimum stock level: "),
    10
  );

  let tags = [];
  while (tags.length === 0) {
    const tagInput = await question("Enter tags (comma-separated): ");
    tags = [
      ...new Set(
        tagInput
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t.length > 0)
      ),
    ];
    if (tags.length === 0) {
      console.log("Please enter at least one valid tag.");
    }
  }

  newItem.tags = tags;
  const now = new Date().toISOString();
  newItem.createdAt = now;
  newItem.updatedAt = now;
  newItem.deleted = false;

  inventory.push(newItem);
  await saveInventory(inventory);

  console.log("Item Added successfully:");
  console.log(newItem);

  rl.close();
}

async function listItem() {
  const inventory = await loadInventory();
  const visibleItems = inventory.filter((item) => !item.deleted);
  console.log(visibleItems);
}

addItem();

module.exports = {
  addItem,
  listItem,
};
