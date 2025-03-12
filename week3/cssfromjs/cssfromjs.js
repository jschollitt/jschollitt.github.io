function changeTextSize() {
    let element = document.getElementById("ex3Demo");
    let newSize = document.getElementById("fontRange").value;
    element.style.fontSize = newSize + "px";
}

function changeColour() {
    let element = document.getElementById("ex2Demo");
    let newColour = document.getElementById("ex2Colour").value;
    element.style.backgroundColor = newColour;
}

var ex1Toggle = true;

function changeTextStyle() {
    let element = document.getElementById("ex1Demo");

    if (ex1Toggle === true) {
        element.style.fontSize = "25px";
        element.style.color = "red";
    } else {
        element.style.fontSize = "20px";
        element.style.color = "black";
    }
    ex1Toggle = !ex1Toggle;
}