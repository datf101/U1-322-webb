// Globala variabler
var input1Elem, input2Elem;
var msgElem;

var selfruitsElem;

var selfruitNr; // Nummer på vald frukt
// ------------------------------
//funktion som körs dä hela webbsidan är inladdad, dvs då alla HTML-kod är utförd.
//initiering av globala variabler samt koppling av funktioner till knapparna
function init(){
input1Elem = document.getElementById("input1");
input2Elem = document.getElementById("input2");
msgElem = document.getElementById("message");
selfruitsElem = document.getElementById("selectedfruits");
document.getElementById("btn1").onclick = showfruit;
document.getElementById("btn2").onclick = addfruits;
}// End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad

// ------------------------------
/*
// första implementering
// avläs textfältet och visa bild på vald frukt function showfruit(){
    let nr = Number (input1Elem.value); // Hämta fruktens nummer från input 1

if (nr <1 || nr > 5){
    msgElem.innerHTML = "du måste skriva ett tal mellan 1 och 5"
    return;
}

if (isNaN(nr)) {
    msgElem.innerHTML = "Du måste skriva ett tal med siffror"
    return;
}

nr = parseInt(nr); // konvertera till heltal, t.ex. 3.45 blir 3
input1Elem.value = nr;
let url; //Url för bilden

switch (nr){
        case 1: url = "img/apple.png"; break;
        case 2: url = "img/pear.png"; break;
        case 3: url = "img/orange.png"; break;
        case 4: url = "img/banana.png"; break;
        case 5: url = "img/pinapple.png"; break;
        default: url = "img/nofruit.png"; break; 
    }

    document.getElementById("fruitImg").src =url;
}// End showfruit
*/
// ------------------------------
//Andra implementaring
//Avläs textfältet och visa bilen på vald frukt
function showfruit(){
    let nr = checkNr(input1Elem.value,5); //hämta från input1, övre gräns är 5
if (nr == null) return;
input1Elem.value = nr;
document.getElementById("fruitImg").src = getfruitUrl(nr);
selfruitNr = nr; // spara vald frukt i den globala variabeln
} // End showfruit
// ------------------------------
//Ta fram url till den bild som ska visas
function getfruitUrl(nr) {
    let url; // Url för bilden
    switch (nr) {
        case 1: url = "img/apple.png"; break;
        case 2: url = "img/pear.png"; break;
        case 3: url = "img/orange.png"; break;
        case 4: url = "img/banana.png"; break;
        case 5: url = "img/pinapple.png"; break;
        default: url = "img/nofruit.png"; break; 
    }
    return url;
}
// End getfruitUrl
// ------------------------------
//kontrollera om nr är ett ta eller ligger inom gränsen o till high

function checkNr (nr,high) {
    msgElem.innerHTML = "";
if (isNaN(nr)) {
    msgElem.innerHTML = "du måste skriva ett tal med siffror";
    return null;
}
if (nr <1 || nr >high) {
    msgElem.innerHTML = "du måste skriva ett tal mellan 1 och " + high;
    return null;
}
nr = parseInt(nr); // konvertera till heltal, t.ex. 3.45 blir 3
return nr;
} 
// End checkNr 
// -----------------------------
// lägg till vald frukt i lista med valda frukter

function addFruits() {
    if (selFruitNr == 0) {
        msgElem.innerHTML = "du måste först välja en frukt.";
        return;
    }
    let amount = checkNr (input1Elem.value,9); //Hämta antal från input 2, övre gräns är 9
    if (amount == null) return;
    let imgList = ""; // HTML-kod för nya img-taggar
    let fruitUrl = getFruitUrl(selFruitNr); // Url till bild för vald frukt
    for (let i = 0; i < amount; i++){
        imgList += "<img src='" + fruitUrl + "' alt= 'frukt'>";
    }
    selFruitsElem.innerHTML += imgList;
} // End addFruits
// -----------------------------