var input1Elem, input2Elem, resultElem;

function init() {
    input1Elem = document.getElementById("input1");
    input2Elem = document.getElementById("input2");
    resultElem = document.getElementById("result");
    document.getElementById("runBtn").onclick = areaCalculations;
} //End init
window.onload = init;


function areaCalculations() {
    var length;    // Längd i meter
    var width;     // Bredd i meter
    var area;      // Yta i kvadratmeter
    var area;      // Yta med pie
    var area;      // Yta om bredden ökas med 5
    var area;      // Yta med 50% mer yta och ökad med 3 meter
    var kvadratfot;     //Yta i triangeln

    length = Number(input1Elem.value);
    width = Number(input2Elem.value);

    resultElem.innerHTML = area;

// Area för en rektangel
area = length * width;
resultElem.innerHTML = "<p>Rektangelns area är " + area + "m<sup>2</sup></p>";

// Area för en ellips
area = 3.14 * length * width / 4;
resultElem.innerHTML += "<P> Ellipsens area är " + area + "m<sup>2</sup></p>";

// Area om bredden är bredden ökad med 5
area = (length + 5) * width;
resultElem.innerHTML += "<p>Längden + 5 ger rektangelns area "
+ area + "m<sup>2</sup></p>";

// Area om bredden ökas med 3 och längden ökas med 50%
area = (length * 1.5) * width + 3;
resultElem.innerHTML += "<p>Längden ökar med 50% och bredden ökar med 3 meter " + area + "m<sup>2</sup></p>";

// Area i triangeln
kvadratfot = (length * width) / 2 * 3.28;
resultElem.innerHTML += "<p> Arean i triangeln är  " + area + "m<sup>2</sup></p>";

} // End areaCalculations