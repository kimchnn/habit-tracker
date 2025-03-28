
// Elements for pet interaction 
const healthFill = document.getElementById('health-fill');
const dinoImage = document.getElementById('dino-image');
const balanceElement = document.getElementById("balance");
const inventory = [
    { name: "burger", description: "+20 ❤", price: 20, healthEffect: 20, imageUrl: "https://i.ibb.co/0tN5QWv/Burger.png" },
    { name: "ball", description: "+10 ❤", price: 10, healthEffect: 10, imageUrl: "https://i.ibb.co/DMHTKCy/Ball.png"  },
];

// Game variables
let health = 0; // Starting health percentage
let balance = 100; // Starting balance $

// Function to update Dino's health bar and image when it falls below certain %
function updateHealth() {
    healthFill.style.width = `${health}%`; 
    
    if (health > 70) {
        dinoImage.src = "https://i.ibb.co/ZT0hcJd/dino0.png";
    } else if (health > 40) {
        dinoImage.src = "https://i.ibb.co/8swBnnp/Sad-Dino.png"; 
    } else if (health > 10) {
        dinoImage.src = "https://i.ibb.co/wyWmwfM/Angry-Dino.png"; 
    } else {
        dinoImage.src = "https://i.ibb.co/2YBcYBH/Crying-Dino.png"; 
    }
}

// Function to display the balance with a dollar sign
function updateBalance() {
    balanceElement.textContent = "$" + balance.toLocaleString();  
}

// Function to render inventory items dynamically with images
function renderInventory() {
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = '';
    
    inventory.forEach((item, index) => {
        const listItem = document.createElement("li");
        
        listItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="inventory-item-image">
            <div class="item-description">${item.description}</div>
            <button class="buy-button" data-index="${index}">$${item.price}</button>
        `;
        
        inventoryList.appendChild(listItem);
    });
}


// Function to handle buying an item
function buyItem(index) {
    const item = inventory[index];

    if (balance >= item.price) { 
        balance -= item.price; 
        health = Math.min(100, health + item.healthEffect); 

        if (health === 100) {
            showNotification("HP is now full!");
        } else {
            showNotification(`You bought a ${item.name} and gained ${item.healthEffect} HP!`);
        }

        updateHealth(); 
        updateBalance(); 
    } else {
        showNotification("You don't have enough balance to buy this item.");
    }
}

// Function to create a pop-up notification when an item is purchased
function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => notification.remove(), 500);
    }, 1000);
}

// Function to decrease health over time
function decreaseHealth() {
    if (health > 0) {
        health-= 0.0007716; // Decrease health by 0.0007716% every second = 100 to 0 in 1.5 days
        updateHealth();
    }
}

// Event listener for "Buy Item" buttons
document.getElementById("inventory-list").addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("buy-button")) {
        const index = parseInt(event.target.getAttribute("data-index"));
        buyItem(index); 
    }
});

// Initial set up
window.onload = function() {
    renderInventory();
    updateHealth();
    updateBalance();
};

// call to decreaseHealth every 
setInterval(decreaseHealth, 1000);  