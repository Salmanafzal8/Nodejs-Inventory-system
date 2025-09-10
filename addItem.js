const fs = require("fs");

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

function addItem(rl, callback) {
  let itemObj = {};
  const inventory = loadInventory();
  const maxId =
    inventory.length > 0
      ? Math.max(...inventory.map((item) => item.id || 0))
      : 0;
  itemObj.id = maxId + 1;

  rl.question("Enter a product name: ", (name) => {
    itemObj.name = name;

    rl.question("Enter category of the product: ", (category) => {
      itemObj.category = category;

      rl.question("Enter quantity of the product: ", (quantity) => {
        itemObj.quantity = parseInt(quantity);

        rl.question("Enter price: ", (price) => {
          itemObj.price = parseFloat(price);

          rl.question("Enter minimum stock level: ", (minStockLevel) => {
            itemObj.minStockLevel = parseInt(minStockLevel);

            const askTags = () => {
              rl.question("Enter tags (comma separated): ", (tagsInput) => {
                const tags = [
                  ...new Set(
                    tagsInput
                      .split(",")
                      .map((t) => t.trim())
                      .filter((t) => t.length > 0)
                  ),
                ];

                if (tags.length === 0) {
                  console.log(" Please enter at least one valid tag.");
                  askTags();
                } else {
                  itemObj.tags = tags;

                  const now = new Date().toISOString();
                  itemObj.createdAt = now;
                  itemObj.updatedAt = now;

                  inventory.push(itemObj);
                  saveInventory(inventory);

                  console.log(" Item added successfully!");
                  console.log(itemObj);

                  function printMenu() {
                    console.log(
                      "Choose the option in menu by pressing the key number"
                    );
                    console.log("1.Add new item");
                    console.log("2.Exit Menu");
                  }

                  function options() {
                    printMenu();
                    rl.question("Choose Any?", (input) => {
                      const choice = input.trim().toLowerCase();
                      switch (choice) {
                        case "1":
                          console.log("You choose option 1 for add a item");
                          addItem(rl, options);
                          break;
                        case "2":
                          console.log("Exiting the aplication...");
                          rl.close();
                          break;
                        default:
                          console.log(
                            "Invalid choice.Choose te correct option"
                          );
                          options();
                      }
                    });
                  }
                  options();
                }
              });
            };
            askTags();
          });
        });
      });
    });
  });
}

module.exports = { addItem, loadInventory, saveInventory };
