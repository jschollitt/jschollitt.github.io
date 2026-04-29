
function HelloPerson({ firstname, lastname }) {

    function clicked() {
        alert(`Hello ${firstname} ${lastname}`)
    }

    return (
        <>
            <h3>Hello {firstname} {lastname}</h3>
            <button onClick={clicked}>Click Me</button>
        </>
    );
}

export default HelloPerson;

