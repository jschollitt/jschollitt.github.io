let people = [];

$('document').ready(function () {
    // Example 1 setup
    $('#ex1randomPerson').click(function (e) {
        getRandomPersonData();
    });

    $('#ex1addPerson').click(function (e) {
        addPerson(...getFormFields());
    });

    $('#ex1clearData').click(function (e) {
        clearPeople();
    });

    // Example 2 setup
    $('#ex2button').click(function (e) {
        getGeo2();
    });

    // Example 3 setup
    $('#ex3button').click(function (e) {
        getPokemon();
    });
});


function getFormFields() {
    console.log("Get form fields");
    return [
        $('#fname').val(),
        $('#lname').val(),
        $('#email').val()
    ];
}

function setFormFields(fname, lname, email) {
    console.log("set form fields");
    $('#fname').val(fname);
    $('#lname').val(lname);
    $('#email').val(email);
}

function getRandomPersonData() {
    console.log("get random person...");
    setLoading('#ex1loader', true);

    // artificial delay to simulate loading
    setTimeout(() => {
        $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                let person = data.results[0];
                setFormFields(person.name.first, person.name.last, person.email);
                setLoading('#ex1loader', false);
            },
            error: function (e) {
                setLoading('#ex1loader', false);
                console.error(e);
                alert(e.statusText);
            }
        });
    }, 1000);
}

function addPerson(first, last, email) {
    console.log("add person");
    people.push({
        firstname: first,
        lastname: last,
        email: email,
    });
    showPeopleJSON();
    setFormFields("", "", "");
}

function showPeopleJSON() {
    console.log("show json");
    let jsonString = JSON.stringify(people, null, 4);
    console.log(jsonString);
    $('#ex1json').val(jsonString);
}

function clearPeople() {
    people = [];
    $('#ex1json').val("");
}

function setLoading(element, show) {
    $(element).css("visibility", show ? "visible" : "hidden");
}