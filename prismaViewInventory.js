const { loadInventory } = require("./addItem");

async function prismaViewInventory() {
  const inventory = await loadInventory();
  console.log(inventory);
}
prismaViewInventory()