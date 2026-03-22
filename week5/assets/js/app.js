window.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector("#modal");

    document.querySelector("#btnOpenModal").addEventListener("click", () => {
        modal.style.visibility = "visible";
    });

    document.querySelector("#btnCloseModal").addEventListener("click", () => {
        modal.style.visibility = "hidden";
    });
});