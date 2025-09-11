    const fs = require('fs');

    const filePath = './inventory.json';

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        return;
      }

      try {
        const jsonData = JSON.parse(data);

        console.log("--- Inventory Report ---");
        jsonData.forEach(item => {
          const totalValue = item.price * item.quantity;
          console.log(`Product: ${item.name}, Price: $${item.price.toFixed(2)}, Quantity: ${item.quantity}, Total Value: $${totalValue.toFixed(2)}`);
        });

      } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
      }
    });