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
    inUse: false
  },
  escavatorPit: {
    price: 100000,
    quantity: 0,
    multiplier: 1000
  }
};

function revealGame() {
  document.getElementById("section-intro").classList.add("hidden");
  document.getElementById("section-game").classList.remove("hidden")
}

function mineMoon() {
  cheese += 1 + (clickUpgrades.pickaxes.multiplier * clickUpgrades.pickaxes.quantity) + (clickUpgrades.jackHammers.multiplier * clickUpgrades.jackHammers.quantity)
  updateCheese()

}

function buyPickaxe() {
  if (cheese >= 20 + (clickUpgrades.pickaxes.quantity * 10)) {
    cheese -= 20 + (clickUpgrades.pickaxes.quantity * 10)
    clickUpgrades.pickaxes.quantity++
  }
  else {
    console.log("You don't have enough for this purchase");
    
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
    console.log("You don't have enough for this purchase");

  }
  updateCheese()
  updateInventory()
}

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
  collectAutoUpgrades()
}

function droidMine(){
  let result = cheese += 1 + (automaticUpgrades.droidMiners.multiplier * automaticUpgrades.droidMiners.quantity)
  console.log("droidMine" + result)
  updateCheese()
}

function updateCheese() {
  let cheeseCountElem = document.getElementById("cheese-count")
  cheeseCountElem.innerText = "Cheese Mined: " + cheese.toString()
}

function collectAutoUpgrades() {
  applyCoolDown()
  setTimeout(removeCoolDown, 10000)
  let interval = setInterval(droidMine, 1000)
  setTimeout(function () { clearInterval(interval) }, 10000)
}


function updateInventory() {
  let pickaxeCountElem = document.getElementById("pickaxe-count")
  pickaxeCountElem.innerText = "Pickaxes Accumulated: " + clickUpgrades.pickaxes.quantity.toString()

  let droidCountElem = document.getElementById("droid-count")
  droidCountElem.innerText = "Droid Miners Accumulated: " + automaticUpgrades.droidMiners.quantity.toString()
}

function removeCoolDown(){
  document.getElementById("buyDroidMinerbtn").classList.remove("disabled")
  document.getElementById("buyDroidMinerbtn").disabled = false;
}

function applyCoolDown(){
  document.getElementById("buyDroidMinerbtn").classList.add("disabled")
  document.getElementById("buyDroidMinerbtn").disabled = true;
}