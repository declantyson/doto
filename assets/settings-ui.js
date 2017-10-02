
function bindTextSettings() {
    var inputs = document.getElementsByClassName('settings-input');

    for(var i = 0; i < inputs.length; i++) {
        var input = inputs[i],
            components = input.name.split('-'),
            setting = components[0],
            subsetting = components[1];

        input.value = settings[setting][subsetting];

        input.onchange = function() {
            updateTextSetting(this);
        };
    }
}

function bindNewsSources() {
    // News sources
    widget(
        settings.getPotenitalNewsSources(),
        function (data) {
            for(var i = 0; i < data.sources.length; i++) {
                var label = document.createElement('label'),
                    name = document.createElement('span'),
                    input = document.createElement('input'),
                    source = data.sources[i];

                input.type = 'checkbox';
                input.name = 'news-feed-source';
                input.className = 'settings-checkbox';
                input.value = source.id;

                for(var s = 0; s < settings.news.feed.length; s++) {
                    if(settings.news.feed[s].source === source.id) {
                        input.checked = true;
                    }
                }

                input.onchange = function() {
                    updateCheckboxSetting(this);
                };

                name.innerText = source.name;

                label.appendChild(input);
                label.appendChild(name);
                label.className = 'settings-label';

                document.getElementById('news-sources').appendChild(label);
            }
        },
        function () {
            // TODO
        }
    );
}

function updateTextSetting(input) {
    var components = input.name.split('-'),
        setting = components[0],
        subsetting = components[1];

    settings[setting][subsetting] = input.value;
    chrome.storage.sync.set({ settings: settings }, function () {
        weather();
        news();
    });
}

function updateCheckboxSetting(input) {
    var checkboxes = document.querySelectorAll('input[name='+input.name+']'),
        components = input.name.split('-'),
        setting = components[0],
        subsetting = components[1],
        property = components[2],
        settingOptions = [];

    for(var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];

        if(checkbox.checked) {
            var settingObject = settings.getSettingTemplate(setting, subsetting);
            settingObject[property] = checkbox.value;
            settingOptions.push(settingObject);
        }
    }

    settings[setting][subsetting] = settingOptions;
    chrome.storage.sync.set({ settings: settings }, function () {
        weather();
        news();
});
}

function syncChromeSettings() {
    var settingsToggle = document.getElementById('settings-toggle'),
        settingsUi = document.getElementById('settings-ui');

    settingsToggle.className = 'present';
    settingsUi.className = 'present';

    settingsToggle.onclick = function () {
        settingsToggle.className = settingsToggle.className.indexOf('show') === -1 ? 'present show' : 'present';
        settingsUi.className = settingsUi.className.indexOf('show') === -1 ? 'present show' : 'present';
    };

    chrome.storage.sync.get('settings', function (data) {
	if(!data.hasOwnProperty('settings')) {
	    chrome.storage.sync.set({ settings: settings });
	} else {

            if(data.settings.hasOwnProperty('weather')) {
                settings.weather = data.settings.weather;
            } else {
                chrome.storage.sync.set({ settings: { weather : settings.weather } });
            }

            weather();

            if(data.settings.hasOwnProperty('news')) {
                settings.news = data.settings.news;
            } else {
                chrome.storage.sync.set({ settings: { news : settings.news } });
            }

	}
        news();

        bindTextSettings();
        bindNewsSources();
    });
}
