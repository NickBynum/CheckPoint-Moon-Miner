let cheese = 0
let clickUpgrades = {
  pickaxes: {
    type: "wooden",
    price: 100,
    quantity: 0,
    multiplier: 1
  }
};

let automaticUpgrades = {
  droidMiners: {
    price: 600,
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

function buyPickaxe(){
  if(cheese >= 20) {
    cheese -= 20
    clickUpgrades.pickaxes.quantity++
    console.log("Pickaxe purchase successful")
  }
updateCheese()
}

function updateCheese() {
  let cheeseCountElem = document.getElementById("cheese-count")
  cheeseCountElem.innerText = "Cheese Mined: " + cheese.toString()
}

function collectAutoUpgrades(){
  let interval = setInterval(mineMoon, 1000)
  setTimeout(function () { clearInterval(interval) }, 10000)
}
