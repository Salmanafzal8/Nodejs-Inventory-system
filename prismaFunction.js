const fs = require("fs");
const { saveInventrory, loadInventory } = require("./addItem");

export async function addItem(
  name,
  category,
  quantity,
  price,
  minStockLevel,
  tags
) {
  let itemObj = {};
  const inventory = await loadInventory();
  const newItem = {
    id: inventory.length > 0 ? inventory[inventory.length - 1].id + 1 : 1,
    name,
    category,
    quantity,
    price,
    minStockLevel,
    tags,
  };
  inventory.push(newItem);
  await saveInventrory(inventory);
  console.log("Item Added successfully", newItem);
}
