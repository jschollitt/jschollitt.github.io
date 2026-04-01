// global variables for the gradient slider demo
let canvas3;
let context3;
let mygradient = null;
let gradientVal = 0.5;
let gradientDirection = 3;
let gradientColours = ["#ffffff", "#111111", "#000000"];

window.onload = () => {
    canvas3 = document.getElementById('canvas3');
    context3 = canvas3.getContext("2d");
    
    let pickers = document.querySelectorAll("input[type='color']");
    for (let i = 0; i < pickers.length; i++) {
        gradientColours[i] = pickers[i].value;
    }
    gradientVal = document.querySelector("#myRange").value/100 ?? 0.5;
    
    DrawGradients(gradientVal);
}

function DrawGradients(value) {
    if (value != null && value != undefined) gradientVal = value;
    RecalcGradient();
    context3.clearRect(0, 0, canvas3.clientWidth, canvas3.clientHeight);
    context3.fillStyle = mygradient;
    context3.fillRect(0, 0, canvas3.clientWidth, canvas3.clientHeight);
}

function RecalcGradient() {
    switch (gradientDirection) {
        case 2:
            mygradient = context3.createLinearGradient(0, 0, canvas3.clientWidth, 0);
            break;
        case 3:
            mygradient = context3.createLinearGradient(0, 0, canvas3.clientWidth, canvas3.clientHeight);
            break;
        case 4:
            mygradient = context3.createLinearGradient(0, canvas3.clientHeight, canvas3.clientWidth, 0);
            break;
        default:
            mygradient = context3.createLinearGradient(0, 0, 0, canvas3.clientWidth);
            break;
    }

    mygradient.addColorStop(0, gradientColours[0]);
    mygradient.addColorStop(gradientVal, gradientColours[1]);
    mygradient.addColorStop(1, gradientColours[2]);
}

function SliderUpdate(slider) {
    DrawGradients((isNaN(slider.value) ? 50 : slider.value) / 100);
}

function SetGradientDir(option) {
    gradientDirection = option;
    SliderUpdate(document.getElementById("myRange"));
}

function SetGradientCol(index, colour) {
    gradientColours[index] = colour;
    DrawGradients();
}