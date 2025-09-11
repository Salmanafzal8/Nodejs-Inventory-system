const { loadInventory } = require("./addItem");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (str) => new Promise((resolve) => rl.question(str, resolve));

async function findOne() {
  let inventory = await loadInventory();

  const inputId = await question("Enter a id you want to find data:");
  const numericId = parseInt(inputId);
  inventory = inventory.map((item) => {
    if (item.id === numericId) {
      console.log(`Here is data of ${numericId}:`);
      console.log(item);
    }
  });
}
findOne();
