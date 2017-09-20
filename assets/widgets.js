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

function weather() {
    // Weather widget
    widget(
        "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=c3ec0e268239d674fbe215f89868ee73&units=metric",
        function (data) {
            var weather = document.getElementById('weather'),
                temperature = document.createElement('p'),
                image = document.createElement('img');

            image.setAttribute('src', 'assets/weather/' + data.weather[0].icon + '.png');
            weather.innerHTML = "";
            weather.className = "visible";
            temperature.innerHTML = data.main.temp.toFixed(0) + "&deg;";
            weather.appendChild(image);
            weather.appendChild(temperature);
        },
        function () {
            // do nothing
        }
    );
}
