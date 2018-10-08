
/* Remember to comment code before submission */

window.onload= function() {
  Particles.init({
    selector: '.background',
    color: '#808080',
    connectParticles: true,
    maxParticles: 125
  });
};

var input
var inputValue
var FULL_SRC_CODE
const SRC_CODE_URL = "https://api.etherscan.io/api?module=contract&action=getsourcecode&address="
const TOKEN = "&apikey=U4WZMWZGNXEKF64XTG8YISH1B62BV95MY6"

function setURL(inputValue){
    FULL_SRC_CODE = SRC_CODE_URL + inputValue + TOKEN
}

function displaySourceCode() {
    let form = document.querySelector("form")
    input = document.querySelector('#source-code-box')
    form.addEventListener("submit", event => {
        event.preventDefault()})
        inputValue = input.value
        setURL(inputValue)
        requestSourceCode()
        setTimeout(function(){ alert("Source code will open in a new tab, you may have to enable pop-ups")})
}

function requestSourceCode() {
    fetch(FULL_SRC_CODE)
    .then(function(result) {
        return result.json()
    })
    .then(function(res) {
        let newWindow = window.open()
        newWindow.document.write(res.result[0].SourceCode)
        console.log(res.result[0].SourceCode)
    })
    .catch(function(error) {
        console.log(error)
    })
}
