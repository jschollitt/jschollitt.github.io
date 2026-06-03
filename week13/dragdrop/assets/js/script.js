window.addEventListener('DOMContentLoaded', () => {
	// Fix browser default behaviour to open dropped files
    window.addEventListener("dragover", function (e) {
        e = e || event;
        e.preventDefault();
    }, false);
    window.addEventListener("drop", function (e) {
        e = e || event;
        e.preventDefault();
    }, false);

    // Example 1 setup
    let dropzones = document.getElementsByClassName("ex1dropzone");
    for (let i = 0; i < dropzones.length; i++) {
        dropzones[i].ondrop = drop;
        dropzones[i].ondragover = allowDrop;
    }

    let draggable = document.getElementById("ex1drag");
    draggable.ondragstart = drag;
});

function allowDrop(e) {
    console.log(`allow drop: ${e}`);
    e.preventDefault();
}

function drag(e) {
    console.log(`drag: ${e}`);
    e.dataTransfer.setData("text", e.target.id);
    setDropzoneHighlight(document.getElementsByClassName("ex1dropzone"), true);
}

function drop(e) {
    console.log(`drop: ${e}`);
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    let dataElement = document.getElementById(data);
    if (dataElement.parentElement !== e.target.parentElement) {
        e.target.appendChild(dataElement);
    }
    setDropzoneHighlight(document.getElementsByClassName("ex1dropzone"), false);
}

function setDropzoneHighlight(dropzones, state) {
    if (dropzones.length == 0) return;
    for (let i = 0; i < dropzones.length; i++) {
        if (state) {
            dropzones[i].classList.add("highlightDropzone");
        }
        else {
            dropzones[i].classList.remove("highlightDropzone");
        }
    }
}

