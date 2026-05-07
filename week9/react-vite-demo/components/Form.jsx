import { useState } from "react";
//import { getCurrentDate, getCurrentTime } from "../services/time";

function Form({ onAdd }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    function handleSubmit(e) {
        // stop the form being sent to backend
        e.preventDefault();

        // if any values are invalid, cancel submission
        if (!name || !date || !time) {
            return;
        }

        // send data to the App component
        onAdd({ name, date, time });

        // reset all values in the state
        setName("");
        setDate("");
        setTime("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;

