const readline = require("readline");
const addItem = require("./addItem");
const deleteItem = require("./deleteItem");

function options() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter a option (1 = Add a new Item , 2 = Delete a item , Exit = To exit)", (input) => {
    const choice = input.trim().toLowerCase();
    switch (choice) {
      case "1":
        console.log("You choose option 1 for add a item ");
        rl.close();
        addItem();
        break;
      case "2":
        console.log("You choose option 2 for a delete a item");
        rl.close();
        deleteItem();
        break;
      case "Exit":
        console.log("Exiting the aplication");
        rl.close();
        break;
      default:
        console.log("Invalid choice.Choose te correct option");
        options();
    }
  });
}
options();
