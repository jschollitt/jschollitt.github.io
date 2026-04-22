const API_URL = "http://localhost:3000/add";

async function testGet() {
    const a = document.getElementById("getA").value;
    const b = document.getElementById("getB").value;
    try {
        const response = await fetch(`${API_URL}?a=${a}&b=${b}`);
        const data = await response.json();
        document.getElementById("getResult").innerText = data.result ?? data.error;
    } catch (err) {
        document.getElementById("getResult").innerText = "Error: " + err;
    }
}

async function testPost() {
    const a = parseFloat(document.getElementById("postA").value);
    const b = parseFloat(document.getElementById("postB").value);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ a, b })
        });
        const data = await response.json();
        document.getElementById("postResult").innerText = data.result ?? data.error;
    } catch (err) {
        document.getElementById("postResult").innerText = "Error: " + err;
    }
}