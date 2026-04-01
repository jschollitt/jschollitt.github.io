// global variables for the mouse click demo
let canvas9;
let context9;

window.onload = () => {
    canvas9 = document.getElementById('canvas9');
    context9 = canvas9.getContext("2d");
    canvas9.addEventListener("mousedown", click);

}

function click(event) {
    let rect = canvas9.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    context9.beginPath();
    context9.arc(x, y, 20, 0, 2 * Math.PI, true);
    context9.closePath();
    context9.fillStyle = "#ff8080";
    context9.fill();
}