const bigInt = require('big-integer');
const sha3_224 = require('js-sha3').sha3_224;

function randomArray(n) {
    let result = [];
    for (let i = 0; i < n; i++) {
        result.push(Math.random() > 0.5 ? 0 : 1);
    }
    return result;
}


function randomDecimal(number, bit) {
    let decimas = [];
    for (let j = 0; j < number; j++) {
        let binaries = ''
        for (let i = 0; i < bit; i++) {
            binaries += Math.random() > 0.5 ? 0 : 1;
        }
        decimas.push(bigInt(parseInt(binaries, 2)).toString());
    }
    return decimas;
}

function randomStr() {
    let str = 'abcdefghrjklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomStr = '';
    let randomLenth = Math.random()*100;
    for (let i = 0; i < randomLenth; i++) {
       randomStr +=  str.charAt(Math.floor(Math.random()*str.length));
    }
    return randomStr;
}

function calculateI(arrI, arrai, k, p, θ) {
    let ciphertextIndexVector = [];
    arrI.forEach((ele, index) => {
        if(ele === 0) {
            ciphertextIndexVector.push(bigInt(k).multiply(bigInt(arrai[index])).mod(p).toString());
        } else {
            ciphertextIndexVector.push(bigInt(θ).add(bigInt(arrai[index])).multiply(k).mod(p).toString());
        }
    })
    return ciphertextIndexVector;
}

function calculateQ(arrQ, arrci, k1, m, p) {
    let ciphertextSearchTrap = [];
    arrQ.forEach((ele, index) => {
        if(ele === 0) {
            ciphertextSearchTrap.push(bigInt(arrci[index]).multiply(k1).mod(p).toString());
        } else {
            ciphertextSearchTrap.push(bigInt(arrci[index]).add(m).multiply(k1).mod(p).toString());
        }
    })
    return ciphertextSearchTrap;
}


function getP(arrI, arrQ, p) {
    let result = bigInt();
    arrI.forEach((elem, index) => {
        result = bigInt(arrI[index]).add(bigInt(arrQ[index])).add(result);
    });
    return result.mod(p).toString()
}

function getE(θ, m) {
    return bigInt(θ).multiply(m).toString();
}

function getG(P, E) {
    let modResult = bigInt(P).mod(E);
    return bigInt(P).minus(modResult).toString();
}

function getResult(arrI, arrQ) {
    let result = bigInt();
    arrI.forEach((elem, index) => {
        result = bigInt(arrI[index]).multiply(arrQ[index]).add(result)
    });
    return result.toString();
}

function getBinaryLength(content) {
    return bigInt(parseInt(sha3_224(content), 16).toString(2)).toString().length;
}

module.exports = {
    randomArray,
    randomStr,
    randomDecimal,
    calculateI,
    calculateQ,
    getP,
    getE,
    getG,
    getBinaryLength,
    getResult
}