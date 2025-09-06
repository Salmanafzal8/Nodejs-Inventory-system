const { saveInventory, loadInventory } = require("./addItem");

function updateItem(rl, callback) {
  function printMenu() {
    console.log("\n========== Update menu ==========");
    console.log("1. Update name");
    console.log("2. Update category");
    console.log("3. Update quantity");
    console.log("4. Update price");
    console.log("5. Update minStockLevel");
    console.log("6. Update tags");
    console.log("7. Exit to Main Menu");
  }

  rl.question("Enter Item ID to update: ", (id) => {
    const numericId = parseInt(id);
    let inventory = loadInventory(); 
    const item = inventory.find((it) => it.id === numericId);

    if (!item) {
      console.log("Item not found.");
      return callback(); 
    }

    function options() {
      printMenu();
      rl.question("Choose Any? ", (input) => {
        const choice = input.trim();
        switch (choice) {
          case "1":
            rl.question("Enter new name: ", (newName) => {
              item.name = newName;
              saveInventory(inventory);
              console.log("Name updated successfully!");
              options();
            });
            break;

          case "2":
            rl.question("Enter new category: ", (newCategory) => {
              item.category = newCategory;
              saveInventory(inventory);
              console.log("Category updated successfully!");
              options();
            });
            break;

          case "3":
            rl.question("Enter new quantity: ", (newQuantity) => {
              item.quantity = parseInt(newQuantity);
              saveInventory(inventory);
              console.log("Quantity updated successfully!");
              options();
            });
            break;

          case "4":
            rl.question("Enter new price: ", (newPrice) => {
              item.price = parseFloat(newPrice);
              saveInventory(inventory);
              console.log("Price updated successfully!");
              options();
            });
            break;

          case "5":
            rl.question("Enter new minStockLevel: ", (newMinStockLevel) => {
              item.minStockLevel = parseInt(newMinStockLevel);
              saveInventory(inventory);
              console.log("MinStockLevel updated successfully!");
              options();
            });
            break;

          case "6":
            rl.question("Enter new tags (comma separated): ", (newTags) => {
              item.tags = newTags.split(",").map((tag) => tag.trim());
              saveInventory(inventory);
              console.log("Tags updated successfully!");
              options();
            });
            break;

          case "7":
            console.log("Returning to main menu...");
            callback(); 
            break;

          default:
            console.log("Invalid choice. Try again.");
            options();
        }
      });
    }

    options();
  });
}

module.exports = updateItem;


