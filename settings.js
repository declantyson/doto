var settings = {
    weather: {
        city: 'London',
        country: 'GB',
        lat: '51.5085',
        lon: '-0.1258',
        units: 'metric',
        api_key: 'c3ec0e268239d674fbe215f89868ee73'
    },

    news: {
        feed: [
            { source: 'bbc-news', sort_by: 'top'},
            { source: 'bbc-sport', sort_by: 'top'},
            { source: 'ars-technica', sort_by: 'top'}
        ],
        api_key: 'e0fddafbeb304299913237a89228f313'
    },

    templates: {
        news: {
            feed: { sort_by : "top" }
        }
    },

    getWeatherURL: function(options) {
        var url = 'https://api.openweathermap.org/data/2.5/weather?';

        options = options || 'city';
        url += 'appid='+settings.weather.api_key+'&units='+settings.weather.units;

        switch (options) {
            case 'coordinates':
                url += '&lat='+settings.weather.lat+'&lon='+settings.weather.lon;
                break;
            default:
                url += '&q='+settings.weather.city+','+settings.weather.country;
        }

        return url;
    },

    getPotenitalNewsSources: function () {
        var url = 'https://newsapi.org/v1/sources';
        return url;
    },

    getNewsSources: function() {
      var url = 'https://newsapi.org/v1/articles?',
          sources = [];

      url += 'apiKey='+settings.news.api_key;

      settings.news.feed.forEach(function (source) {
        sources.push(url+'&source='+source.source+'&sortBy='+source.sort_by);
      });

      return sources;
    },

    getSettingTemplate(setting, subsetting) {
        return JSON.parse(JSON.stringify(settings.templates[setting][subsetting]));
    }
};
