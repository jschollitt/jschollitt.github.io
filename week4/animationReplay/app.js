function adReplay() {
    let ad = document.getElementById("adWrapper");
    let copy = ad.cloneNode(true);
    ad.replaceWith(copy);
}