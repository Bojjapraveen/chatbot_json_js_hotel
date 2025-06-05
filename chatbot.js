document.addEventListener("DOMContentLoaded", () => {
    loadSearchHistory();
});

function saveSearchHistory(itemName) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!history.includes(itemName)) {
        history.push(itemName);
        localStorage.setItem("searchHistory", JSON.stringify(history));
    }
}

function loadSearchHistory() {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    let datalist = document.getElementById("searchHistory");

    datalist.innerHTML = ""; // Clear previous options
    history.forEach(item => {
        let option = document.createElement("option");
        option.value = item;
        datalist.appendChild(option);
    });
}

async function askChatbot() {
    let category = document.getElementById("category").value;
    let item_name = document.getElementById("item_name").value.trim();

    if (!category || !item_name) {
        document.getElementById("response").innerText = "Please select a category and enter an item name.";
        return;
    }

    saveSearchHistory(item_name); // Store search history

    try {
        let response = await fetch(`/chatbot?category=${category}&item_name=${item_name}`);
        let data = await response.json();

        document.getElementById("response").innerText = data.response;
    } catch (error) {
        document.getElementById("response").innerText = "Error fetching chatbot response!";
        console.error("Fetch error:", error);
    }
}