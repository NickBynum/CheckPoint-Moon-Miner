let cheese = 0
let clickUpgrades = {
  pickaxes: {
    price: 20,
    quantity: 0,
    multiplier: 1
  },

  jackHammers: {
    price: 1000,
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
    timeout: 10000,
    unlockID: "droid"
  },
  escavatorPit: {
    price: 10000,
    quantity: 0,
    multiplier: 1100,
    inUse: false,
    timeOut: 30000,
    unlockID: "escavator"
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

function buyClickUpgrades(clickChoice) {
  let upgradePurch = clickUpgrades[clickChoice]
  if (cheese >= upgradePurch.price + (upgradePurch.quantity * 10)) {
    cheese -= upgradePurch.price + (upgradePurch.quantity * 10)
    upgradePurch.quantity++
    console.log("Item purchased")
  }
  else {
    alert("You don't have enough for this purchase");
  }
  updateCheese()
  updateInventory()
}

// SECTION ******** replaced by refactoring *************
// Ensure you have enough points to buy, and complete purchase
// function buyPickaxe() {
//   if (cheese >= 20 + (clickUpgrades.pickaxes.quantity * 10)) {
//     cheese -= 20 + (clickUpgrades.pickaxes.quantity * 10)
//     clickUpgrades.pickaxes.quantity++
//   }
//   else {
//     alert("You don't have enough for this purchase");

//   }
//   updateCheese()
//   updateInventory()
// }

// function buyJackHammer() {
//   if (cheese >= 100 + (clickUpgrades.jackHammers.quantity * 10)) {
//     cheese -= 100 + (clickUpgrades.jackHammers.quantity * 10)
//     clickUpgrades.jackHammers.quantity++
//   }
//   else {
//     alert("You don't have enough for this purchase");

//   }
//   updateCheese()
//   updateInventory()
// } 
//#endregion

function buyAutoUpgrades(clickChoice) {
  let autoUpgradePurch = automaticUpgrades[clickChoice]
  let unlockID = autoUpgradePurch.unlockID
  document.getElementById(unlockID).disabled = false
  if (cheese >= autoUpgradePurch.price + (autoUpgradePurch.quantity * 10)) {
    cheese -= autoUpgradePurch.price + (autoUpgradePurch.quantity * 10)
    autoUpgradePurch.quantity++
  }
  else {
    alert("You don't have enough for this purchase");
  }
  updateCheese()
  updateInventory()
}
//SECTION *****REFACTOR COMPLETE*** 
//  buyDroidMiner() and buyEscavator() need consolidated into single function
// This function completes the purchase of one droid and disables the ability to buy another
// function buyDroidMiner() {
//   if (automaticUpgrades.droidMiners.inUse) {
//     return
//   }
//   else if (cheese >= automaticUpgrades.droidMiners.price + (automaticUpgrades.droidMiners.quantity * 10)) {
//     cheese -= automaticUpgrades.droidMiners.price + (automaticUpgrades.droidMiners.quantity * 10)
//     automaticUpgrades.droidMiners.quantity++
//   }
//   else {
//     alert("You don't have enough for this purchase");
//   }
//   updateCheese()
//   updateInventory()
// }
// function buyEscavator() {
//   if (automaticUpgrades.escavatorPit.inUse) {
//     return
//   }
//   else if (cheese >= automaticUpgrades.escavatorPit.price + (automaticUpgrades.escavatorPit.quantity * 10)) {
//     cheese -= automaticUpgrades.escavatorPit.price + (automaticUpgrades.escavatorPit.quantity * 10)
//     automaticUpgrades.escavatorPit.quantity++
//   }
//   else {
//     alert("You don't have enough for this purchase");
//   }
//   updateCheese()
//   updateInventory()
// }
//#endregion
// //SECTION ****refactored *****
function autoMine(playerChoice) {
  let autoUpgrade = automaticUpgrades[playerChoice]
  if(autoUpgrade.quantity !== 0){
    console.log(autoUpgrade.quantity)
  let result = cheese += 1 + (autoUpgrade.multiplier * autoUpgrade.quantity)
  updateCheese()}
  else
  {
  return}
}

// function escavatorMine() {
//   let result = cheese += 1 + (automaticUpgrades.escavatorPit.multiplier * automaticUpgrades.escavatorPit.quantity)
//   updateCheese()
// }
////#endregion

// FIXME  escavatorMine() and droidMine() need consolidated into collectAutoUpgrades()
function collectAutoUpgrades(playerChoice) {
  let autoUpgrade = automaticUpgrades[playerChoice]
  // if (autoUpgrade.inUse == true) {
  //   return
  // }
  // applyCoolDown()
  // setTimeout(removeCoolDown, 10000)
  let interval = setInterval(function (){autoMine(playerChoice)}, 1000);
  setTimeout(function () { clearInterval(interval) }, 10000)
  // autoUpgrade.inUse = true
}

function updateCheese() {
  let cheeseCountElem = document.getElementById("cheese-count")
  cheeseCountElem.innerText = "Cheese Mined: " + cheese.toString()
  unlockPurchases()
}


// FIXME  Need to pull the correct autoupgrade that was selected to disable and re-enable the buttons
function removeCoolDown() {
  document.getElementById("tool").classList.remove("disabled")
  // @ts-ignore
  document.getElementById("tool").disabled = false;
}

function applyCoolDown(playerChoice) {
  let tool = automaticUpgrades[playerChoice]
  document.getElementById("tool").classList.add("disabled")
  // @ts-ignore
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

function unlockPurchases(){
  // Pickaxe
  let pricePickaxeElem = clickUpgrades.pickaxes.price
  let quantPickaxeElem = clickUpgrades.pickaxes.quantity
  if(cheese >= pricePickaxeElem) {
    document.getElementById("buyPickaxebtn").disabled = false
  }
  else{
    document.getElementById("buyPickaxebtn").disabled = true
  }
// Jackhammer
  let priceJackhammerElem = clickUpgrades.jackHammers.price
  let quantJackhammerElem = clickUpgrades.jackHammers.quantity
  if(cheese >= priceJackhammerElem) {
    document.getElementById("buyJackHammerbtn").disabled = false
  }
  else{
    document.getElementById("buyJackHammerbtn").disabled = true
  }
// Droid Miner
  let priceDroidElem = automaticUpgrades.droidMiners.price
  let quantDroidElem = automaticUpgrades.droidMiners.price
  if(cheese >= priceDroidElem) {
    document.getElementById("buyDroidMinerbtn").disabled = false
  }
  else{
    document.getElementById("buyDroidMinerbtn").disabled = true
  }
// Escavator Pit
  let priceEscavatorElem = automaticUpgrades.escavatorPit.price
  let quantEscavatorElem = automaticUpgrades.escavatorPit.quantity
  if(cheese >= priceEscavatorElem) {
    document.getElementById("buyEscavatorbtn").disabled = false
  }
  else{
    document.getElementById("buyEscavatorbtn").disabled = true
  }
}

// if(quantEscavatorElem >= 1){
//   
// }
// if(quantDroidElem >= 1){
//   document.getElementById("droidMiners").disabled = false
// }