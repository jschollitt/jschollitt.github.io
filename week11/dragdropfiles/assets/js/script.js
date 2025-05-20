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

        // Example 2 setup
    fileReader = new FileReader();
    fileReader.addEventListener("load", loadImage);
    document.getElementById("ex2dropzone").addEventListener("dragover", dragoverImage);
    document.getElementById("ex2dropzone").addEventListener("dragleave", dragleaveImage);
    document.getElementById("ex2dropzone").addEventListener("drop", dropImage);
    document.getElementById("ex2button").addEventListener("click", fileExplorer);
    document.getElementById("ex2fileInput").addEventListener("change", fileExplorerUpload);
});

let fileobj;
let fileReader;
function uploadImage(file) {
    if (!fileobj.type.includes('image')) {
        return alert("Image file types only");
    }
    if (fileobj.size > 10_000_000) {
        return alert("File too large, please try a smaller image");
    }

    fileReader.readAsDataURL(fileobj);
}

function dragoverImage() {
    setDropzoneHighlight([document.getElementById('ex2dropzone')], true);
    return false;
}

function dragleaveImage() {
    setDropzoneHighlight([document.getElementById('ex2dropzone')], false);
}

function dropImage(e) {
    e.preventDefault();
    fileobj = e.dataTransfer.files[0];
    uploadImage(fileobj);
    setDropzoneHighlight([document.getElementById('ex2dropzone')], false);
}

function fileExplorer() {
    document.getElementById('ex2fileInput').click();
}

function fileExplorerUpload() {
    fileobj = document.getElementById('ex2fileInput').files[0];
    uploadImage(fileobj);
}

function loadImage(e) {
    const image = document.getElementById("ex2img");
    image.style.backgroundImage = `url(${e.target.result})`;
}

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

