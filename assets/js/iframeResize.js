let iframes = [];
window.addEventListener("DOMContentLoaded", () => {
    iframes = document.getElementsByTagName("iframe");
    window.addEventListener("resize", resizeIFrames());
});

function resizeIFrames() {
    for (let i = 0; i < iframes.length; i++) {
        window.addEventListener("resize", () => {resizeIFrame(iframes[i])});

    }
}

function resizeIFrame(object) {
    object.style.height = Math.max(500, object.contentWindow.document.documentElement.scrollHeight + 'px');
    console.log("resize iframe");
}

const handleFormSubmission = function (e) {
    let fname = document.querySelector("#fname").value;
    let lname = document.querySelector("#lname").value;
    let dob = document.querySelector("#dob").value;
    let pword = document.querySelector("#pword").value;

    alert(`Name: ${fname} ${lname}\nDate of birth: ${dob}\nPassword: ${pword}`);
}