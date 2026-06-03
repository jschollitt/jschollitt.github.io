const people = [
    {
        fname: "Lise",
        lname: "Meyer",
        email: "lise.meyer@example.com"
    },{
        fname: "Tania",
        lname: "Oquendo",
        email: "tania.oquendo@example.com"
    },{
        fname: "Adriana",
        lname: "Pires",
        email: "a.pires@example.com"
    },{
        fname: "Onni",
        lname: "Kemppainen",
        email: "o.kemppainen@example.com"
    },{
        fname: "Nepobor",
        lname: "Dolenko",
        email: "nepobor.dolenko@example.com"
    },{
        fname: "Shilpa",
        lname: "Naik",
        email: "shilpa.naik@example.com"
    },{
        fname: "Milla",
        lname: "Heinonen",
        email: "milla.heinonen@example.com"
    },{
        fname: "Zachary",
        lname: "Jones",
        email: "zachary.jones@example.com"
    }
];

window.addEventListener('DOMContentLoaded', () => {
	    // Example 3 setup
    document.getElementById('ex3savesession').addEventListener("click", saveSessionData);
    document.getElementById('ex3savelocal').addEventListener("click", saveLocalData);
    document.getElementById('ex3loadsession').addEventListener("click", loadSessionData);
    document.getElementById('ex3loadlocal').addEventListener("click", loadLocalData);
    document.getElementById('ex3populate').addEventListener("click", populate);
    document.getElementById('ex3clear').addEventListener("click", clearStorage);
});

function getFormFields() {
    return [
        document.getElementById('fname').value,
        document.getElementById('lname').value,
        document.getElementById('email').value
    ];
}

function setFormFields(fname, lname, email) {
    document.getElementById('fname').value = fname;
    document.getElementById('lname').value = lname;
    document.getElementById('email').value = email;
}

function populate() {
    let person = people[Math.floor(Math.random() * 7)];
    setFormFields(person.fname, person.lname, person.email);
}

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

function saveSessionData() {
    if (!storageAvailable("sessionStorage")) {
        setMessage("Session Storage is not available in this browser", "red", 5000);
        return;
    };

    let data = getFormFields();
    sessionStorage.setItem("firstname", data[0]);
    sessionStorage.setItem("lastname", data[1]);
    sessionStorage.setItem("email", data[2]);
    setMessage("Data saved in Session Storage", "#55ff55", 3000);
    setFormFields("", "", "");
}

function saveLocalData() {
    if (!storageAvailable("localStorage")) {
        setMessage("Local Storage is not available in this browser", "red", 5000);
        return;
    }

    let data = getFormFields();
    localStorage.setItem("firstname", data[0]);
    localStorage.setItem("lastname", data[1]);
    localStorage.setItem("email", data[2]);
    setMessage("Data saved in Local Storage", "#55ff55", 3000);
    setFormFields("", "", "");
}

function loadSessionData() {
    let fname = sessionStorage.getItem("firstname") ?? "";
    let lname = sessionStorage.getItem("lastname") ?? "";
    let email = sessionStorage.getItem("email") ?? "";
    setFormFields(fname, lname, email);
    setMessage("Data loaded from Session Storage", "#55ff55", 3000);
}

function loadLocalData() {
    let fname = localStorage.getItem("firstname") ?? "";
    let lname = localStorage.getItem("lastname") ?? "";
    let email = localStorage.getItem("email") ?? "";
    setFormFields(fname, lname, email);
    setMessage("Data loaded from Local Storage", "#55ff55", 3000);
}

function clearStorage() {
    sessionStorage.clear();
    localStorage.clear();
    setFormFields("", "", "");
}

function setMessage(message, colour, time) {
    let msg = document.getElementById('ex3message');
    msg.innerText = message;
    msg.style.backgroundColor = colour;
    msg.style.visibility = "visible";

    setTimeout(function () {
        msg.style.visibility = "hidden";
    }, time);
}