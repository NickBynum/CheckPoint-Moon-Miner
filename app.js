let cheese = 0
let clickUpgrades = {
  pickaxes: {
    price: 100,
    quantity: 0,
    multiplier: 1
  }
};

let automaticUpgrades = {
  droidMiners: {
    price: 60,
    quantity: 0,
    multiplier: 20
  }
};

function revealGame() {
  document.getElementById("section-intro").classList.add("hidden");
  document.getElementById("section-game").classList.remove("hidden")
}

function mineMoon() {
  cheese += 1 + (clickUpgrades.pickaxes.multiplier * clickUpgrades.pickaxes.quantity)
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

function buyDroidMiner() {
  if (cheese >= automaticUpgrades.droidMiners.price + (automaticUpgrades.droidMiners.quantity * 10)) {
    cheese -= automaticUpgrades.droidMiners.price + (automaticUpgrades.droidMiners.quantity * 10)
    automaticUpgrades.droidMiners.quantity++
  }
  else {
    console.log("You don't have enough for this purchase");

  }
  updateCheese()
  updateInventory()
  collectAutoUpgrades()
}

function updateCheese() {
  let cheeseCountElem = document.getElementById("cheese-count")
  cheeseCountElem.innerText = "Cheese Mined: " + cheese.toString()
}

function collectAutoUpgrades() {
  let interval = setInterval(droidMine, 3000)
  setTimeout(function () { clearInterval(interval) }, 10000)
  console.log("collectAutoUpgrades" + automaticUpgrades.droidMiners.multiplier);
  
}

function droidMine(){
  let result = cheese += 1 + (automaticUpgrades.droidMiners.multiplier * automaticUpgrades.droidMiners.quantity)
  console.log("droidMine" + result)
  updateCheese()
}

function updateInventory() {
  let pickaxeCountElem = document.getElementById("pickaxe-count")
  pickaxeCountElem.innerText = "Pickaxes Accumulated: " + clickUpgrades.pickaxes.quantity.toString()

  let droidCountElem = document.getElementById("droid-count")
  droidCountElem.innerText = "Droid Miners Accumulated: " + automaticUpgrades.droidMiners.quantity.toString()
}
