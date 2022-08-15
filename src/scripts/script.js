"use strict";
let n, l, e, d;
function calculate() {
// let, p = 11, q = 13 ⇒ n = 143, l = 120
var p = document.getElementById("p").value;
var q = document.getElementById("q").value;
if (!(validatePrime(p, "P") && validatePrime(q, "Q"))) {
    return;
}
n = p * q;
document.getElementById("n").value = n;
l = (p - 1) * (q - 1);
document.getElementById("l").value = l;
// ek = [7,17,19,23,29,31]
var ek = findEncryptionKeys(n, l);
// ek[0] = 7 ⇒ e = 7
document.getElementById("e").value = ek[0];
document.getElementById("encryption-keys").innerHTML = "<span class='color-black'>Possible encryption keys are: </span>" + ek.join(', ');
encryptionKeyChanged();
}
function findEncryptionKeys(n, l) {
    var ek = [];
    // a number between 1 and l that is coprime with n and l
    for (var i = 2; i < l; i++) {
        if (isCoPrime(i, n) && isCoPrime(i, l)) {
            ek.push(i);
            if (ek.length > 5) {
                break;
            }
        }   
    }
    return ek;
}
// the default first encryption key can be replaced with one of the other possible keys
function encryptionKeyChanged() {
    e = document.getElementById("e").value;   
    // dk = [223,343,463,583,703,823]
    var dk = findDecryptionKeys(l, e);
    /* dk.splice(dk.indexOf(e), 1):
       → indexOf(): returns -1 if the value is not found   
       dk.indexOf(e) = -1 (∵ value of e is not found)
       dk.splice(-1, 1) (removes the last element from an array)
       dk = [223,343,463,583,703] */
    dk.splice(dk.indexOf(e), 1); 
    // dk[0] = 223 ⇒ d = 223
    d = dk[0];
    document.getElementById("d").value = d;
    document.getElementById("decryption-keys").innerHTML = "<span class='color-black'>Possible decryption keys are: </span>" + dk.join(', ');
    /* public key (e, n): (7, 143)
       private key (d, n): (223, 143) */
    document.getElementById("public-key").innerHTML = "(" + e + ", " + n + ")";
    document.getElementById("private-key").innerHTML = "(" + d + ", " + n + ")";
}
function findDecryptionKeys(l, e) {
    var dk = [];
    for (var d = l + 1; d < l + 100000; d++) {
        // remainder of the product of d and e when divided by l should be 1
        if ((d * e) % l === 1) {
            dk.push(d);
            if (dk.length > 5) {
                return dk;
            }
        }
    }
    return dk;
}
// the default first decryption key can be replaced with one of the other possible keys
function decryptionKeyChanged() {
    d = document.getElementById("d").value;
    document.getElementById("private-key").innerHTML = "(" + d + ", " + n + ")";
}
function encryptMessage() {
    var message = document.getElementById("message").value;
    /* message = Ravindra Mevada
       Array.from(Array(message.length).keys()).map(i => message.charCodeAt(i)):
       → from(): returns an array from any object with a length property or from any iterable object
       → keys(): returns an array iterator object with the keys of an array and it does not change the original array
       → charCodeAt(): returns an integer between 0 and 65535 representing the UTF-16 code unit at the given index
       Array.from(Array(message.length).keys()) = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
       Array.from(Array(message.length).keys()).map(i => message.charCodeAt(i)) = [82,97,118,105,110,100,114,97,32,77,101,118,97,100,97] */
    var m = Array.from(Array(message.length).keys()).map(i => message.charCodeAt(i));
    /* m.map(i => modularExponentiation(i, e, n)): (encryption)
       → modularExponentiation(i, e, n): calculates encrypted message (c) = (message (m) ^ e) % n [(base ^ exponent) % modulus]
       m.map(i => modularExponentiation(i, e, n)) = [69,59,79,118,33,100,49,59,98,77,62,79,59,100,59] */
    var c = m.map(i => modularExponentiation(i, e, n));
    document.getElementById("encrypted-message").innerHTML = c.join(", ");
    document.getElementById("encrypted-message-textbox").value = c.join(", ");
}
function decryptMessage() {
    // c = [69,59,79,118,33,100,49,59,98,77,62,79,59,100,59]
    var c = stringToNumberArray(document.getElementById("encrypted-message-textbox").value);
    /* c.map(i => modularExponentiation(i, d, n)): (decryption)
       → modularExponentiation(i, d, n): calculates decrypted Message (m) = (encrypted Message (c) ^ d) % n [(base ^ exponent) % modulus]
       c.map(i => modularExponentiation(i, d, n)) = [82,97,118,105,110,100,114,97,32,77,101,118,97,100,97] */
    var m = c.map(i => modularExponentiation(i, d, n));
    var message = "";
    /* m.map(x => message += String.fromCharCode(x)):
       → fromCharCode(): returns a string created from the specified sequence of UTF-16 code units
       m.map(x => message += String.fromCharCode(x)): message = R,Ra,Rav,Ravi,Ravin,Ravind,Ravindr,Ravindra,Ravindra ,Ravindra M,Ravindra Me,Ravindra Mev,Ravindra Meva,Ravindra Mevad,Ravindra Mevada 
       message = Ravindra Mevada */
    m.map(x => message += String.fromCharCode(x));
    document.getElementById("decrypted-message").innerHTML = message;
}
function validatePrime(prime, nameOfPrime) {
    if (!isPrime(prime)) {
        document.getElementById("not-prime").innerHTML = "<span class='color-black'>Enter only prime numbers for P & Q:</span> Here, " + nameOfPrime + " is not a Prime Number!<br><span class='color-dark-silver'><em>Reload the page and enter the specified inputs.</em></span>";
        return false;
    }
    return true;
}
function isPrime(num) {
    // ✓ why do we check up to the square root of a number to determine if the number is prime...
    let sqrtNum = Math.sqrt(num);
    for (let i = 2; i <= sqrtNum; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return num !== 1;
}
function isCoPrime(a, b) {
    /*
    here, n = 143 and l = 120
    isCoPrime(2, 143) && isCoPrime(2, 120)
	isCoPrime(2, 143): a = 2, b = 143
    factors of a: 2 [(1, 2): 1 forms a coprime pair with any other number]
	factors of b: 143 = 11, 13, 143 [(1, 11, 13, 143): 1 forms a coprime pair with any other number]
	→ no shared factor ⇒ isCoPrime(2, 143): true
	isCoPrime(2, 120): a = 2, b = 120
	factors of a: 2
	factors of b: 120 = 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60, 120
	→shared factor: 2 ⇒ isCoPrime(2, 120): false
    → true && false: false
    isCoPrime(31, 143) && isCoPrime(31, 120)
	isCoPrime(31, 143): a = 31, b = 143
	factors of a: 31 
	factors of b: 143 = 11, 13, 143 
	→ no shared factor ⇒ isCoPrime(31, 143): true
	isCoPrime(31, 120): a = 31, b = 120
	factors of a: 31 
	factors of b: 120 = 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60, 120
	→ no shared factor ⇒ isCoPrime(31, 120): true
    → true && true: true 
    */
	// here, i = 31 ⇒ a = 31: aFac = [31]
	var aFac = findFactors(a);
	// here, n = 143 ⇒ b = 143: bFac = [11,13,143]
	var bFac = findFactors(b);
	/* 
    aFac.every(x => bFac.indexOf(x) < 0):
    → every(): executes a function for each array element
	→ indexOf(): returns the position of the first occurrence of a value and returns -1 if the value is not found
	let, a = 2 ⇒ aFac = 2 and b = 120 ⇒ bFac = [2,3,4,5,6,8,10,12,15,20,24,30,40,60,120]
	2 => bFac.indexOf(2) = 1 ≮ 0: false
	→ result: false
	let, a = 31 ⇒ aFac = 31 and b = 143 ⇒ bFac = [11,13,143]
	31 => bFac.indexOf(31) = -1 < 0: true
	→ result: true
    */
	var result = aFac.every(x => bFac.indexOf(x) < 0);
	return result;
}              
function findFactors(num) {
    /*
    here, n = 143 and l = 120 
    findFactors(143):
    num = 143
	half = 71
    143 % 2 === 0: false ⇒ i = 3, j = 2
	3 to 71 increment by 2
	  143 % 3 === 0: false
	  143 % 5 === 0: false
	  .                  .
	  143 % 11 === 0: true ⇒ result = [11]
	  143 % 13 === 0: true ⇒ result = [11,13]
	  .                                      .
	  143 % 71 === 0: false
    result.push(num): result.push(143): result = [11,13,143]
	→ result = [11,13,143]
    findFactors(120):
	num = 120
	half = 60
    120 % 2 === 0: true ⇒ i = 2, j = 1    
	2 to 60 increment by 1  
	  120 % 2 === 0: true ⇒ result = [2]
	  120 % 3 === 0: true ⇒ result = [2, 3]
	  .                                   .
	  120 % 7 === 0: false
	  120 % 9 === 0: false
	  .                  .
	  120 % 60 === 0: true ⇒ result = [2,3,4,5,6,8,10,12,15,20,24,30,40,60]  
	result.push(num): result.push(120): result = [2,3,4,5,6,8,10,12,15,20,24,30,40,60,120]
	→ result = [2,3,4,5,6,8,10,12,15,20,24,30,40,60,120]
	*/
	var half = Math.floor(num / 2),
		result = [],
		i, j;
	num % 2 === 0 ? (i = 2, j = 1) : (i = 3, j = 2);
	for(i; i <= half; i += j) {
		num % i === 0 ? result.push(i) : false;
	}
	result.push(num);
	return result;
}
function modularExponentiation(base, exponent, modulus) {
	/*
    encrypted message (c) = (message (m) ^ e) % n (encryption)
    here, m = 82 (ASCII: letter 'R' from "Ravindra Mevada")
	i: base = 82, e: exponent = 7, n: modulus = 143
	82 % 143 = 82,
	7 > 0 ⇒ 7 % 2 === 1 ⇒ (1 * 82) % 143 = 82, ⌊7 / 2⌋ = 3, (82 * 82) % 143 = 3;
	3 > 0 ⇒ 3 % 2 === 1 ⇒ (82 * 3) % 143 = 103, ⌊3 / 2⌋ = 1, (3 * 3) % 143 = 9;
	1 > 0 ⇒ 1 % 2 === 1 ⇒ (103 * 9) % 143 = 69, ⌊1 / 2⌋ = 0, (9 * 9) % 143 = 81;
	0 ≯ 0
	→ result: 69
	decrypted message (m) = (encrypted Message (c) ^ d) % n (decryption)
	here, c = 69
	i: base = 69, d: exponent = 223, n: modulus = 143
	69 % 143 = 69,
	223 > 0 ⇒ 223 % 2 === 1 ⇒ (1 * 69) % 143 = 69, ⌊223 / 2⌋ = 111, (69 * 69) % 143 = 42;
	111 > 0 ⇒ 111 % 2 === 1 ⇒ (69 * 42) % 143 = 38, ⌊111 / 2⌋ = 55, (42 * 42) % 143 = 48;
	55 > 0 ⇒ 55 % 2 === 1 ⇒ (38 * 48) % 143 = 108, ⌊55 / 2⌋ = 27, (48 * 48) % 143 = 16;
	27 > 0 ⇒ 27 % 2 === 1 ⇒ (108 * 16) % 143 = 12, ⌊27 / 2⌋ = 13, (16 * 16) % 143 = 113;
	13 > 0 ⇒ 13 % 2 === 1 ⇒ (12 * 113) % 143 = 69, ⌊13 / 2⌋ = 6, (113 * 113) % 143 = 42;
	6 > 0 ⇒  6 % 2 !== 1, ⌊6 / 2⌋ = 3, (42 * 42) % 143 = 48;
	3 > 0 ⇒ 3 % 2 === 1 ⇒ (69 * 48) % 143 = 23, ⌊3 / 2⌋ = 1, (48 * 48) % 143 = 16;
	1 > 0 ⇒ 1 % 2 === 1 ⇒ (23 * 16) % 143 = 82, [1 / 2] = 0, (16 * 16) % 143 = 113;
	0 ≯ 0
	→ result: 82 (ASCII: letter 'R' from "Ravindra Mevada")
    */
	if(modulus === 1) {
		return 0;
	}
	var result = 1;
	base = base % modulus;
	while(exponent > 0) {
		if(exponent % 2 === 1) {
			result = (result * base) % modulus;
		}
		exponent = Math.floor(exponent / 2);
		base = (base * base) % modulus;
	}
	return result;
}
function stringToNumberArray(str) {
    /* str.split(",").map(i => parseInt(i)):
       str = 69, 59, 79, 118, 33, 100, 49, 59, 98, 77, 62, 79, 59, 100, 59
       str.split(",").map(i => parseInt(i)) = [69,59,79,118,33,100,49,59,98,77,62,79,59,100,59] */
    return str.split(",").map(i => parseInt(i));
}