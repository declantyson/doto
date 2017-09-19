function widget(api, callback, failure) {
    var request = new XMLHttpRequest();
    request.open('GET', api, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            callback(data);
        } else {
            failure();
        }
    };

    request.onerror = function () {
        failure();
    };

    request.send();
}

// Weather widget
widget(
    "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=c3ec0e268239d674fbe215f89868ee73&units=metric",
    function (data) {
        var weather = document.createElement('div'),
            temperature = document.createElement('p'),
            image = document.createElement('img');

        weather.id = "weather";
        image.setAttribute('src', 'assets/weather/' + data.weather[0].icon + '.png');
        temperature.innerHTML = data.main.temp.toFixed(0) + "&deg;";
        weather.appendChild(image);
        weather.appendChild(temperature);
        document.getElementById('content').appendChild(weather);
    },
    function () {
        // do nothing
    }
);
