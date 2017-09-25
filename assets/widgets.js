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
        settings.getWeatherURL(),
        function (data) {
            var weather = document.getElementById('weather'),
                temperature = document.createElement('p'),
                image = document.createElement('img');

            image.setAttribute('src', 'assets/weather/' + data.weather[0].icon + '.png');
            weather.innerHTML = '';
            weather.className = 'visible';
            temperature.innerHTML = data.main.temp.toFixed(0) + '&deg;';
            weather.appendChild(image);
            weather.appendChild(temperature);
        },
        function () {
            // do nothing
        }
    );
}

function news() {
    var sources = settings.getNewsSources(),
        source = sources[Math.floor(Math.random() * sources.length)];

    widget(source,
        function (data) {
            var news = document.getElementById('news'),
                title = document.createElement('p'),
                description = document.createElement('small'),
                article = data.articles[Math.floor(Math.random() * data.articles.length)];

            news.className = '';
            setTimeout(function () {
                news.innerHTML = '';
                news.className = 'visible';
                title.innerText = article.title;
                description.innerText = article.description;

                news.appendChild(title).appendChild(description);
            }, 500);
        },
        function () {
            
        }
    );
}
