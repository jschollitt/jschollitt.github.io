const handleFormSubmission = function (e) {
    let fname = document.querySelector("#fname").value;
    let lname = document.querySelector("#lname").value;
    let dob = document.querySelector("#dob").value;
    let pword = document.querySelector("#pword").value;

    alert(`Name: ${fname} ${lname}\nDate of birth: ${dob}\nPassword: ${pword}`);
}

