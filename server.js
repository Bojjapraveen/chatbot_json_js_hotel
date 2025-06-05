const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.static(".")); // Serve index.html directly

// Load structured data from JSON
const data = JSON.parse(fs.readFileSync("structured_data.json", "utf-8"));

app.get("/chatbot", (req, res) => {
    console.log("Request received:", req.query.category, req.query.item_name);

    const category = req.query.category?.toLowerCase();
    const item_name = req.query.item_name?.toLowerCase();

    if (!category || !item_name) {
        return res.status(400).json({ response: "❌ Please provide both category and item name." });
    }

    try {
        const data = JSON.parse(fs.readFileSync("structured_data.json", "utf8"));

        if (!data[category]) {
            return res.status(404).json({ response: "❌ Category not found!" });
        }

        const result = Object.values(data[category]).find(item =>
            item.Item_Name.toLowerCase().includes(item_name)
        );

        res.json(result
            ? { response: `✅ The price of **${result.Item_Name}** is Rs **${result.Price}**. It is currently **${result.Availability}**. ⭐ Customer rating: **${result.Customer_Rating}/5**. 📌 Booking required: **${result.Booking_Required}**.` }
            : { response: "❌ Item not found!" }
        );
    } catch (error) {
        console.error("Error loading JSON data:", error);
        res.status(500).json({ response: "⚠ Internal server error. Please try again later!" });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));