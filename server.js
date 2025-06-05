const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.static(".")); // Serve index.html directly

// Load structured data from JSON
const data = JSON.parse(fs.readFileSync("structured_data.json", "utf-8"));

app.get("/chatbot", (req, res) => {
    const { category, item_name } = req.query;
    const categoryData = data[category.toLowerCase()] || {};
    const result = Object.values(categoryData).find(item => item.Item_Name.toLowerCase() === item_name.toLowerCase());

    res.json(result ? 
    { response: `The price of ${result.Item_Name} is Rs ${result.Price}. It is currently available ${result.Availability}. Customer rating: ${result.Customer_Rating}/5. Booking required: ${result.Booking_Required}.` } 
    : { response: "Item not found!" }
    );

});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));