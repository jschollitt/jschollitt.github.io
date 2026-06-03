window.addEventListener('DOMContentLoaded', () => {
    // Example 4 setup
    document.getElementById('ex4button').addEventListener("click", getGeo);
});

function getGeo() {
    if (!navigator.geolocation) {
        document.getElementById('ex4lat').innerText = "Geolocation permission denied";
        document.getElementById('ex4long').innerText = "Geolocation permission denied";
        return;
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        document.getElementById('ex4lat').innerText = lat;
        document.getElementById('ex4long').innerText = long;

        var map = L.map('map').setView([lat, long], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, long]).addTo(map);
    });
}