function resizeIFrame(object) {
    object.style.height = object.contentWindow.document.documentElement.scrollHeight + 'px';
    console.log("resize iframe");
}