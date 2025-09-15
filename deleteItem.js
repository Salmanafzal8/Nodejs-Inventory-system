  const {saveInventory,loadInventory} = require("./addItem")

function deleteItem(rl ) {
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
