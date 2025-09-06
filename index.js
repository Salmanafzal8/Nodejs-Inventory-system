const fs = require("fs");
const readline = require("readline");
const { addItem, loadInventory } = require("./addItem");
const deleteItem = require("./deleteItem");
const updateItem = require("./updateItem");
const exportCsv = require("./exportCsv");
const viewInventory = require("./viewInventory");
const recordsale = require("./recordsale");
const { callbackify } = require("util");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function printMenu() {
  console.log("========== INVENTORY SYSTEM ==========");
  console.log("Choose the option in menu by pressing the key number");
  console.log("1.Add item");
  console.log("2.Delete item");
  console.log("3.Update item");
  console.log("4.View Inventory");
  console.log("5.Export Csv File");
  console.log("6.To sale a item");
  console.log("7.Exit Menu");
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
        console.log("You choose option 2 for a delete a item");
        deleteItem(rl, options);
        break;
      case "3":
        console.log("You choose option 3 for a update a item");
        updateItem(rl, options);
        break;
      case "4":
        console.log("You choose option 4 for a view Inventory");
        viewInventory(loadInventory());
        options;
        break;
      case "5":
        console.log("You choose option 5 for a CSV file");
        exportCsv(loadInventory());
        options;
        break;
      case "6":
        console.log("You choose option 6 sale item");
        recordsale(rl,options)
        options;
        break;
      case "7":
        console.log("Exiting the aplication...");
        rl.close();
        break;
      default:
        console.log("Invalid choice.Choose te correct option");
        options();
    }
  });
}
options();
