// https://www.javaspring.net/blog/set-values-in-input-type-date-and-time-in-javascript/

function pad(number) {
    return number < 10 ? `0${number}` : number;
}

function getCurrentDate() {
    let now = new Date();
    let year = now.getFullYear();
    let month = pad(now.getMonth() + 1);
    let day = pad(now.getDate());
    return `${year}-${month}-${day}`;
}

function getCurrentTime() {
    let date = new Date();
    let mins = date.getMinutes();
    let hours = date.getHours();
    return `${hours}:${mins}`;
}

export { getCurrentDate, getCurrentTime };