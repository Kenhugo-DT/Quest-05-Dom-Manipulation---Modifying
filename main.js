
let heroInventory = ["Rusty Sword", "Health Potion", "Magic Ring"];
let ghoulHealth = 100;
let inventoryDisplayed = false;


let fightButton, decipherButton, tomeContent, healthDisplay, ghoulShriek;
let itemInput, addItemButton, removeItemButton, checkReadinessButton, inventoryManagement;

document.addEventListener('DOMContentLoaded', function() {
    
    fightButton = document.getElementById('fight');
    decipherButton = document.getElementById('decipher');
    tomeContent = document.getElementById('tome-content');
    healthDisplay = document.getElementById('ghoul-health');
    ghoulShriek = new Audio('./shriek-sound.mp3');

    itemInput = document.getElementById('item-input');
    addItemButton = document.getElementById('add-item');
    removeItemButton = document.getElementById('remove-item');
    checkReadinessButton = document.getElementById('check-readiness');
    inventoryManagement = document.getElementById('inventory-management');

    
    hideElement(decipherButton);
    hideElement(tomeContent);
    hideElement(inventoryManagement);

    
    fightButton.addEventListener('click', fightGhoul);
    fightButton.addEventListener('mouseenter', playGhoulShriek);
    decipherButton.addEventListener('click', decipherMessage);
    addItemButton.addEventListener('click', addNewItem);
    removeItemButton.addEventListener('click', removeItem);
    checkReadinessButton.addEventListener('click', checkReadiness);

    
    displayUpdatedInventory(false);

    
    updateHealthDisplay();
});


function fightGhoul() {
    if (ghoulHealth > 0) {
        const weapon = "Rusty Sword";
        ghoulHealth = Math.max(0, ghoulHealth - 10);
        console.log(`You attack the ghoul with your ${weapon}, dealing 10 damage!`);
        updateHealthDisplay();

        if (ghoulHealth <= 0) {
            console.log("Victory! You have defeated the ghoul!");
            fightButton.disabled = true;
            showElement(decipherButton);
            showElement(tomeContent);
        }
    }
}

function playGhoulShriek() {
    ghoulShriek.play();
}

function updateHealthDisplay() {
    if (healthDisplay) {
        healthDisplay.textContent = `Ghoul's Health: ${ghoulHealth}`;
    } else {
        console.error("Element with id 'ghoul-health' not found in the DOM");
    }
}


function decipherMessage() {
    const crypticSpans = document.querySelectorAll('span.cryptic');
    const decipheredMessage = Array.from(crypticSpans)
        .map(span => span.textContent)
        .join(' ');
    
    displayDecipheredMessage(decipheredMessage);
    checkForNewItem(decipheredMessage);
    
    if (!inventoryDisplayed) {
        displayUpdatedInventory(true);
    }
}

function displayDecipheredMessage(message) {
    const messageDisplay = document.getElementById('deciphered-message');
    messageDisplay.textContent = "Deciphered message: " + message;
}


function checkForNewItem(message) {
    if (message.toLowerCase().includes("the light bringer")) {
        const newItem = "The Light Bringer Ring";
        if (!heroInventory.includes(newItem)) {
            heroInventory.push(newItem);
            console.log(`New item added to inventory: ${newItem}`);
            console.log("Updated Inventory:", heroInventory);
            displayUpdatedInventory(true);
        }
    }
}

function displayUpdatedInventory(show = false) {
    const inventoryDisplay = document.getElementById('hero-inventory');
    
    inventoryDisplay.innerHTML = `<h3>Hero's Inventory:</h3>
        <ul>${heroInventory.map(item => `<li>${item}</li>`).join('')}</ul>`;
    
    inventoryDisplay.style.display = show ? '' : 'none';
    inventoryManagement.style.display = show ? '' : 'none';
    
    inventoryDisplayed = show;
}

function addNewItem() {
    const newItem = itemInput.value.trim();
    if (newItem && !heroInventory.includes(newItem)) {
        heroInventory.push(newItem);
        displayUpdatedInventory(true);
        itemInput.value = ''; 
    }
}

function removeItem() {
    const itemToRemove = itemInput.value.trim();
    const index = heroInventory.indexOf(itemToRemove);
    if (index > -1) {
        heroInventory.splice(index, 1);
        displayUpdatedInventory(true);
        itemInput.value = ''; 
    }
}

function checkReadiness() {
    const requiredItems = ["The Light Bringer Ring", "Rusty Sword"];
    const isReady = requiredItems.every(item => heroInventory.includes(item));
    
    const readinessMessage = isReady 
        ? "You are ready for battle! Your inventory contains all necessary items."
        : "You are not fully prepared. Make sure you have 'The Light Bringer Ring' and 'Rusty Sword'.";
    
    alert(readinessMessage);
}


function hideElement(element) {
    if (element) {
        element.style.display = 'none';
    }
}

function showElement(element) {
    if (element) {
        element.style.display = '';
    }
}


let mysteriousLocations = ["Whispering Forest", "Echoing Caves", "Shimmering Riverside", "Crumbling Tower"];

for (let i = 0; i < mysteriousLocations.length; i++) {
    let location = mysteriousLocations[i];
    console.log("Exploring: " + location);
    
    if (location === "Echoing Caves") {
        console.log("Found the Ancient Tome in " + location + "!");
        heroInventory.push("Mysterious Tome");
    }
}

console.log("Updated Inventory:", heroInventory);