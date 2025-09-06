const { loadInventory, saveInventory } = require('./addItem');

function recordsale(rl, callback) {
  const inventory = loadInventory();

  rl.question("Enter Item ID to update: ", (idInput) => {
    const itemId = parseInt(idInput);
    const item = inventory.find((i) => i.id === itemId);

    if (!item) {
      console.log("Item not found.");
      return callback(); 
    }

    rl.question("Enter a product quantity you want to buy: ", (qtyInput) => {
      const quantityToBuy = parseInt(qtyInput);

      if (isNaN(quantityToBuy) || quantityToBuy <= 0) {
        console.log("Invalid quantity.");
        return callback();
      }

      if (quantityToBuy > item.quantity) {
        console.log(`Not enough stock. Only ${item.quantity} available.`);
        return callback();
      }

      item.quantity -= quantityToBuy;
      saveInventory(inventory);

      console.log(`Sold ${quantityToBuy} x ${item.name}. Remaining: ${item.quantity}`);
      callback(); 
    });
  });
}

module.exports = recordsale;
