let cheese = 0
let clickUpgrades = {
  pickaxes: {
    price: 100,
    quantity: 0,
    multiplier: 1
  },

  jackHammers: {
    price: 10000,
    quantity: 0,
    multiplier: 10
  }
};

let automaticUpgrades = {
  droidMiners: {
    price: 60,
    quantity: 0,
    multiplier: 20,
    inUse: false,
    timeout: 10000
  },
  escavatorPit: {
    price: 10000,
    quantity: 0,
    multiplier: 1000,
    inUse: false,
    timeOut: 30000
  }
};

function revealGame() {
  document.getElementById("section-intro").classList.add("hidden");
  document.getElementById("section-game").classList.remove("hidden")
}

// Function to apply to modifiers and mine cheese
function mineMoon() {
  cheese += 1 + (clickUpgrades.pickaxes.multiplier * clickUpgrades.pickaxes.quantity) + (clickUpgrades.jackHammers.multiplier * clickUpgrades.jackHammers.quantity)
  updateCheese()

}

//Ensure you have enough points to buy, and complete purchase
function buyPickaxe() {
  if (cheese >= 20 + (clickUpgrades.pickaxes.quantity * 10)) {
    cheese -= 20 + (clickUpgrades.pickaxes.quantity * 10)
    clickUpgrades.pickaxes.quantity++
  }
  else {
    alert("You don't have enough for this purchase");

  }
  updateCheese()
  updateInventory()
}

function buyJackHammer() {
  if (cheese >= 100 + (clickUpgrades.jackHammers.quantity * 10)) {
    cheese -= 100 + (clickUpgrades.jackHammers.quantity * 10)
    clickUpgrades.jackHammers.quantity++
  }
  else {
    alert("You don't have enough for this purchase");

  }
  updateCheese()
  updateInventory()
}
//FIXME   buyDroidMiner() and buyEscavator() need consolidated into single function
// This function completes the purchase of one droid and disables the ability to buy another
function buyDroidMiner() {
  if (automaticUpgrades.droidMiners.inUse) {
    return
  }
  else if (cheese >= automaticUpgrades.droidMiners.price + (automaticUpgrades.droidMiners.quantity * 10)) {
    cheese -= automaticUpgrades.droidMiners.price + (automaticUpgrades.droidMiners.quantity * 10)
    automaticUpgrades.droidMiners.quantity++
  }
  else {
    alert("You don't have enough for this purchase");

  }
  updateCheese()
  updateInventory()
}

function droidMine() {
  let result = cheese += 1 + (automaticUpgrades.droidMiners.multiplier * automaticUpgrades.droidMiners.quantity)
  console.log("droidMine" + result)
  collectAutoUpgrades()
  updateCheese()
}

function buyEscavator() {
  if (automaticUpgrades.escavatorPit.inUse) {
    return
  }
  else if (cheese >= automaticUpgrades.escavatorPit.price + (automaticUpgrades.escavatorPit.quantity * 10)) {
    cheese -= automaticUpgrades.escavatorPit.price + (automaticUpgrades.escavatorPit.quantity * 10)
    automaticUpgrades.escavatorPit.quantity++
  }
  else {
    alert("You don't have enough for this purchase");

  }
  updateCheese()
  updateInventory()
}

function escavatorMine() {
  let result = cheese += 1 + (automaticUpgrades.escavatorPit.multiplier * automaticUpgrades.escavatorPit.quantity)
  updateCheese()

}

function updateCheese() {
  let cheeseCountElem = document.getElementById("cheese-count")
  cheeseCountElem.innerText = "Cheese Mined: " + cheese.toString()
}
 // FIXME  escavatorMine() and droidMine() need consolidated into collectAutoUpgrades()
function collectAutoUpgrades(playerChoice) {
  let tool = automaticUpgrades[playerChoice]
  applyCoolDown()
  setTimeout(removeCoolDown, 10000)
  let interval = setInterval(tool, 1000)
  setTimeout(function () { clearInterval(interval) }, 10000)
}

// FIXME  Need to pull the correct autoupgrade that was selected to disable and renable the buttons
function removeCoolDown() {
  document.getElementById("tool").classList.remove("disabled")
  document.getElementById("tool").disabled = false;
}

function applyCoolDown(playerChoice) {
  let tool = automaticUpgrades[playerChoice]
  document.getElementById("tool").classList.add("disabled")
  document.getElementById("tool").disabled = true;
}

function updateInventory() {
  let pickaxeCountElem = document.getElementById("pickaxe-count")
  pickaxeCountElem.innerText = "Pickaxes Accumulated: " + clickUpgrades.pickaxes.quantity.toString()

  let jackHammerCountElem = document.getElementById("jackhammer-count")
  jackHammerCountElem.innerText = "Jackhammers Accumulated: " + clickUpgrades.jackHammers.quantity.toString()

  let droidCountElem = document.getElementById("droid-count")
  droidCountElem.innerText = "Droid Miners Accumulated: " + automaticUpgrades.droidMiners.quantity.toString()

  let escavatorCountElem = document.getElementById("escavator-count")
  escavatorCountElem.innerText = "Escavator Pits Created: " + automaticUpgrades.escavatorPit.quantity.toString()
  updateStats()
}

// STATS Functionality
function updateStats() {
  let pickAxeMultElem = document.getElementById("pickaxe-mult")
  pickAxeMultElem.innerText = "Current Pickaxe Multiplier: " + (clickUpgrades.pickaxes.multiplier * clickUpgrades.pickaxes.quantity).toString()

  let jackhammerMultElem = document.getElementById("jackhammer-mult")
  jackhammerMultElem.innerText = "Current Jackhammer Multiplier: " + (clickUpgrades.jackHammers.multiplier * clickUpgrades.jackHammers.quantity).toString()

  let droidMultElem = document.getElementById("droid-mult")
  droidMultElem.innerText = "Current Droid Miners Multiplier: " + (automaticUpgrades.droidMiners.multiplier * automaticUpgrades.droidMiners.quantity).toString()

  let escavatorMultElem = document.getElementById("escavator-mult")
  escavatorMultElem.innerText = "Current Escavator Multiplier: " + (automaticUpgrades.escavatorPit.multiplier * automaticUpgrades.escavatorPit.quantity).toString()

  let totalMultElem = document.getElementById("total-mult")
  totalMultElem.innerText = "Total Multipliars being applied: " + (1 + (clickUpgrades.pickaxes.multiplier * clickUpgrades.pickaxes.quantity) + (clickUpgrades.jackHammers.multiplier * clickUpgrades.jackHammers.quantity) + (automaticUpgrades.droidMiners.multiplier * automaticUpgrades.droidMiners.quantity) + (automaticUpgrades.escavatorPit.multiplier * automaticUpgrades.escavatorPit.quantity)).toString()
}