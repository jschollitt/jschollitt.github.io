// global variables for the gradient slider demo
let canvas3;
let context3;
let mygradient = null;
let gradientDirection = 1;

window.onload = () => {

    canvas3 = document.getElementById('canvas3');
    context3 = canvas3.getContext("2d");
    DrawGradients(0.5);
}

function DrawGradients(value) {
    RecalcGradient(value)
    context3.clearRect(0, 0, canvas3.clientWidth, canvas3.clientHeight);
    context3.fillStyle = mygradient;
    context3.fillRect(0, 0, canvas3.clientWidth, canvas3.clientHeight);
}

function RecalcGradient(value) {

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

    mygradient.addColorStop(0, "#ffffff");
    mygradient.addColorStop(value, "#111111");
    mygradient.addColorStop(1, "#000000");
}

function SliderUpdate(slider) {
    DrawGradients((isNaN(slider.value) ? 50 : slider.value) / 100);
}

function SetGradientDir(option) {
    gradientDirection = option;
    SliderUpdate(document.getElementById("myRange"));
}