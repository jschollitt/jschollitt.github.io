const scenes = [];

window.addEventListener("DOMContentLoaded", () => {
    scenes.push(document.querySelector("#scene1"));
    scenes.push(document.querySelector("#scene2"));
    scenes.push(document.querySelector("#scene3"));
    animateFlipbook();
});

function showScene(sceneNumber) {
    for (let i = 0; i < scenes.length; i++) {
        // conditional operator
        scenes[i].style.visibility = (i === sceneNumber) ? "visible" : "hidden";
    }
}

function animateFlipbook() {
    let sceneNumber = 0;
    showScene(sceneNumber);
    let timer = setInterval(run, 3000);

    function run() {
        sceneNumber++;
        if (sceneNumber >= scenes.length) {
            clearInterval(timer);
            sceneNumber = 0;
            return;
        }
        showScene(sceneNumber);
    }
}