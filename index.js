// Dylan Baker - Oct.2018

// Load background immediately and call API request functions
window.onload= function() {
  /*Particles.init({ // Background options
    selector: '.background',
    color: '#000000',
    connectParticles: true,
    maxParticles: 100,
    responsive: [ // Responsiveness options for background
        {
          breakpoint: 850,
          options: {
            maxParticles: 0,
            }
        },
      ]
  });*/
    requestTotalSupply() // API request functions
    requestPrice()
    requestBlock()
    requestGasPrice()
};

// Alert to warn user of adblock interference
function adblockAlert(){
    window.alert('Loading is taking longer than usual, your adblocker may be causing this. Try turning it off and refreshing the page! :)')
}

// API Key
const TOKEN = "&apikey=U4WZMWZGNXEKF64XTG8YISH1B62BV95MY6"

// Variable declarations for source code function
var input
var inputValue
var FULL_SRC_CODE
const SRC_CODE_URL = "https://api.etherscan.io/api?module=contract&action=getsourcecode&address="

// Take user input variable and create the URL to view source code
function setURL(inputValue){
    FULL_SRC_CODE = SRC_CODE_URL + inputValue + TOKEN
}

// Accept user input from the form, assign to a variable and pass into URL function.
function displaySourceCode() {
    let form = document.querySelector("form")
    input = document.querySelector('#source-code-box')
    form.addEventListener("submit", event => {
        event.preventDefault()})
        inputValue = input.value
        setURL(inputValue)
        requestSourceCode()
        setTimeout(function(){ alert("Source code will open in a new tab, you may have to enable pop-ups :)")})
}

// This function is called above and retrieves API data, creates new tab and displays it
function requestSourceCode() {
    fetch(FULL_SRC_CODE)
    .then(function(result) {
        return result.json()
    })
    .then(function(res) {
        let newWindow = window.open()
        newWindow.document.write(res.result[0].SourceCode)
    })
    .catch(function(error) {
        console.log(error)
    })
}

// URL variable declaration for requestTotalSupply function
const SUPPLY_URL = "https://api.etherscan.io/api?module=stats&action=ethsupply"
const FULL_SUPPLY_URL = SUPPLY_URL + TOKEN

// This function requests and displays total ether supply API data
function requestTotalSupply() {
    let timer = setTimeout(adblockAlert, 6000) // if API request doesn't complete in 6 seconds, display adblockAlert
    fetch(FULL_SUPPLY_URL)
    .then(function(result) {
        return result.json()
    })
    .then(function(res) {
        let wei = res.result
        let eth = wei/1000000000000000000 // convert wei to eth
        let cleanEthSupply = eth.toLocaleString('en-US', {maximumFractionDigits:2}) // gives the raw value commas and decimals for readability
        document.getElementById("totalSupply").innerHTML = cleanEthSupply
        clearTimeout(timer) 
    })
    .catch(function(error) {
        console.log(error)
    })
}

// URL variable declaration for requestPrice function
const PRICE_URL = "https://api.etherscan.io/api?module=stats&action=ethprice"
const FULL_PRICE_URL = PRICE_URL + TOKEN

// This function requests and displays current ether price in USD
function requestPrice() {
    fetch(FULL_PRICE_URL)
    .then(function(result) {
        return result.json()
    })
    .then(function(res) {
        let ethPrice = res.result.ethusd
        let cleanEthPrice = "$" + ethPrice + " USD" // USD value format
        document.getElementById("lastPrice").innerHTML = cleanEthPrice
    })
    .catch(function(error) {
        console.log(error)
    })
}

// URL variable declaration for requestBlock function
const BLOCK_URL = "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber"
const FULL_BLOCK_URL = BLOCK_URL + TOKEN

// This function requests and displays last block #
function requestBlock() {
    fetch(FULL_BLOCK_URL)
    .then(function(result) {
        return result.json()
    })
    .then(function(res) {
        let hexNum = res.result
        let blockNum = parseInt(hexNum, 16) // convert hex value to decimal
        document.getElementById("lastBlock").innerHTML = blockNum
    })
    .catch(function(error) {
        console.log(error)
    })
}

// URL variable declaration for requestGasPrice function
const GAS_URL = "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice"
const FULL_GAS_URL = GAS_URL + TOKEN

// This functin requests and displays current ethereum gas price
function requestGasPrice() {
    fetch(FULL_GAS_URL)
    .then(function(result) {
        return result.json()
    })
    .then(function(res) {
        let hexPrice = res.result
        let gasPrice = parseInt(hexPrice, 16) / 1000000000 // convert hex value to wei, then wei to Gwei
        document.getElementById("gasPrice").innerHTML = gasPrice.toFixed(2)
    })
    .catch(function(error) {
        console.log(error)
    })
}