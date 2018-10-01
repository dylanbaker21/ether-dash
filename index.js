var SRC_ADD = placeholder/*user input contract adress here*/
const SRC_CODE_URL = "https://api.etherscan.io/api?module=contract&action=getsourcecode&address="
const TOKEN = "&apikey=U4WZMWZGNXEKF64XTG8YISH1B62BV95MY6"

const FULL_SRC_CODE = SRC_CODE_URL + SRC_ADD + TOKEN

function request() {
    fetch(FULL_SRC_CODE)
    .then(function(result) {
        return result.json()
    })
    .then(function(res) {
        console.log(res.result[0].SourceCode)
    })
    .catch(function(error) {
        console.log(error)
    })
}