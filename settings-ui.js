
function syncChromeSettings() {
    document.getElementById('settings-ui').className = "present";

    chrome.storage.sync.get("settings", function (data) {
        if(data.settings.hasOwnProperty("weather")) {
           settings.weather = data.settings.weather;
        } else {
            chrome.storage.sync.set({ settings: { weather : settings.weather } });
        }

        weather();

        if(data.settings.hasOwnProperty("news")) {
            settings.news = data.settings.news;
        } else {
            chrome.storage.sync.set({ settings: { news : settings.news } });
        }

        news();

        bindTextSettings();
    });
}

function bindTextSettings() {
    var inputs = document.getElementsByClassName('settings-input');

    for(var i = 0; i < inputs.length; i++) {
        var input = inputs[i],
            components = input.id.split('-'),
            setting = components[0],
            subsetting = components[1];

        input.value = settings[setting][subsetting];

        input.onchange = function () {
            var components = this.id.split('-'),
                setting = components[0],
                subsetting = components[1];

            settings[setting][subsetting] = this.value;
            chrome.storage.sync.set({ settings: settings }, function () {
                weather();
                news();
            });
        };
    }
}
