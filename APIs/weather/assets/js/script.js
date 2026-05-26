const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

$('document').ready(function () {
    $('#ex2button').click(function (e) {
        getGeo();
    });
});

function getGeo() {
    if (!navigator.geolocation) {
        alert("Geolocation services not available");
        return;
    }
    if ($('#apikey').val() === "" || $('#apikey').val() === null) {
        alert("Weather request requires API key. Please enter a valid key.");
        return;
    }

    setLoading('#ex2loader', true);

    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let apikey = $('#apikey').val();

        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apikey}`,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                setWeather(data);
                setLoading('#ex2loader', false);
            },
            error: function (e) {
                console.error(e);
                setLoading('#ex2loader', false);
                alert(e.statusText);
            }
        });
    }, function (e) {
        console.error(e);
        setLoading('#ex2loader', false);
        alert("Get Position failed: " + e.message);
    });
}

function setWeather(data) {
    $('.weather-icon').css('background-image', `url("https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png")`);
    $('.weather-description').text(data.weather[0].description);
    $('.weather-temp').text(`${Math.round(data.main.temp)}`);
    $('.weather-temp-range').text(`${Math.round(data.main.temp_max)}°  /  ${Math.round(data.main.temp_min)}°`);
    $('.weather-location').text(data.name);
    let date = new Date();
    $('.weather-time').text(`${date.getHours()}:${date.getMinutes()}`);
    $('.weather-date').text(`${days[date.getDay()]} ${date.getDate()}-${date.getMonth()}`);
}

function setLoading(element, show) {
    $(element).css("visibility", show ? "visible" : "hidden");
}