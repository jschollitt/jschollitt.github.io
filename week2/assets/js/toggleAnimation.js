document.querySelector("#btn-toggle-animation").addEventListener("click", (e) => {
    let root = document.querySelector(":root");
    
    if (root == null || root == undefined) return;

    if (root.style.getPropertyValue("--anim-count") != "infinite") {
        root.style.setProperty("--anim-count", "infinite");
    }
    else {
        root.style.setProperty("--anim-count", "1");
    }
})