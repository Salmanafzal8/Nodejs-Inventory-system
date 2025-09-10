const { resolve } = require("path");
const { saveInventory, loadInventory } = require("./addItem");
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout,
})

const question = (str) => new Promise((resolve) => rl.question(str,resolve))

async function permanentDelete() {
    let inventory = loadInventory()
    const inputId = await question("Enter a ID of a item you want to delete:")
    const numericId = parseInt(inputId)
    inventory = inventory.filter((item)=> item.id !== numericId)
    saveInventory(inventory)
    console.log("Item permananently deleted")
}
permanentDelete()