// Globala konstanter och variabler
const wordList = ["BLOMMA","LASTBIL","SOPTUNNA","KÖKSBORD","RADIOAPPARAT","VINTER","SOMMAR","DATORMUS","LEJON","ELEFANTÖRA","JULTOMTE","SKOGSHYDDA","BILNUMMER","BLYERTSPENNA","SUDDGUMMI","KLÄDSKÅP","VEDSPIS","LJUSSTAKE","SKRIVBORD","ELDGAFFEL","STEKPANNA","KASTRULL","KAFFEBRYGGARE","TALLRIK","SOFFBORD","TRASMATTA","FLYGPLAN","FLYGPLATS","TANGENTBORD"]; // Lista (array) med ord som ska väljas slumpmässigt
var selectedWord; //Textsträng med det ord som slumpmässigt väljs ur wordList
var letterboxes; // Array med referenser till span-elementen för bokstäverna i ordet
var hangmanImg; // Referens till img-elementet med bilder på galgen med gubben
var hangmanImgNr;   //Nummer för aktuell bild som visas (0-6)
var msgElem         //Referens till div-element för meddelanden
var startGameBtn;   //Referens till startknappen
var letterButtons;  //Array med referenser till bokstavsknapparna
var startTime;      //Tid då spelet startar
// ------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
    startGameBtn = document.getElementById("startGameBtn");
    startGameBtn.onclick = startGame;
    letterButtons = document.getElementById("letterButtons"). getElementsByTagName("Button");
    for (let i = 0; i < letterButtons.length; i++) letterButtons[i].onclick = guessLetter;
    hangmanImg = document.getElementById("hangman");
    msgElem = document.getElementById ("message");
    startGameBtn.disabled = false;
    for (let i = 0; i < letterButtons.length; i++) letterButtons[i].disabled = true;
} // End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad
// ------------------------------
// initiera ett nytt spel. välj ord, visa bokstavsrutor, visa första bilden (tom bild)
// sätt bildnummer till 0, inaktivera startkanpp och akivera bokstavskanppen.

function startGame() {
    randomWord();
    showLetterBoxes();
    hangmanImg.src = "img/h0.png";
    hangmanImgNr = 0;
    startGameBtn.disabled = true;
    for (let i = 0; i < letterButtons.length; i++) letterButtons [i]. disabled = false;
    msgElem.innerHTML = "";
    let now = new Date(); // date-objekt för tiden just nu
    startTime = now.getTime(); // Tiden just nu i millisekunder
}// End startGame
// ------------------------------
//Ett ord väljs slumpmässigt. kontroll av att det inte är samma ord som föra gången
function randomWord() {
    let oldWord = selectedWord; // Ordet som används föra gången
    while (oldWord == selectedWord) {
        let worldIndex = Math.floor(worldList.length*Math.random()); // slumptal mellan 0 och antal ord i arrayen wordList
        selectedWord = wordList [wordIndex]; // Nytt ord sparas i den globala variabeln
    }
} // randomWord
// ------------------------------
//visa en ruta för varje bokstav i ordet
function showLetterBoxes () {
    let newCode = ""; //Ny HTML-kod för bokstavsrutor
    for (let i = 0; i < selectedWord.length; i++) {
        newCode += "<span>&nbsp;</span>"; // lägg i ett nonbreakable space, för att en "tom" ruta ska visas
    }
    document.getElementById("letterBoxes").innerHTML = newCode;
    letterboxes = document.getElementById("letterBoxes").getElementsByTagName("span");
}
// ------------------------------
//Användaren klickade på bokstavsknapp
//kontrollera om bokstaven finns i ordet och skriv i så fall ut det.
// Om bokstaven ej finns, uppdateras bilden med galgen och gubben
// Om alla bokstäver är gissade eller om det sista bilden visades, avslutas spelet
function guessLetter(){
    this.disabled = true; // inaktivera knappen
    let letter = this.value; // Hämta bokstaven ur knappen( this är en referens till det button-element som användaren klickat på)
    let letterfound = false; // Flagga (true/false) för att indikera om bokstaven finns o ordet
    let correctLetterCount = 0; // Räknare för antal korrekta bokstäver
    for (let i = 0; i <selectedWord.length; i++){
        //Bokstaven kan förekomma flera gånger, så därför måste alla bokstäver i ordet gås igenom
        if (letter == selectedWord.charAr(i)){
            letterBoxes[i].innerHTML = letter;// visa bokstaven i rutan
            letterfound = true; // bokstaven hittades i ordet
        }
        if (letterBoxes[i].innerHTML != "&nbsp;") correctLetterCount++; //räknaren ränkar upp med 1
    }// End for
    if (letterfound == false){
        //bokstaven fanns ej
        hangmanImgNr++;
        hangmanImg.src = "img/h" + hangmanImgNr + ".png";
        if (hangmanImgNr ==6){
            endGame(true);// Gubben blev hängd
        }
    }
}// End GuessLetter
// ------------------------------
//avsluta spelet genom att skriva ut ett meddelande och sedan aktivera startknappen och inaktivera bokstavsknappen
function endGame(manHanged){
    //manHanged är true eller false
    let runTime = (new Date ().getTime() - startTime) / 1000; //Speltid
    if (manHanged) {
        msgElem.innerHTML = "Tyvärr, gubben hängdes. Rätt svar är " + selectedWord
    }
    else {
        msgElem.innerHTML = "Gratulerar. Du kam fram till rätt ord.";
    }
    msgElem.innerHTML += "<br>Det tog " + runTime.toFixed(1) + "sekunder.";
    startGameBtn.disabled = false;
    for (let i = 0; i <letterButtons.length; i++) letterButton[i].disabled = true;
}//End endGame
// ------------------------------