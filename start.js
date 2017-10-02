get_cinematic_background();
initialize_clock();

setInterval(weather, 5000);
setInterval(news, 5000);


if(typeof lightdm !== 'undefined') {
    build_display();
} else {
    syncChromeSettings();
}

news();
weather();

function debug() {
    lightdm = {
        users: [
            { name: 'DT', display_name: 'Dec' },
            { name: 'DT2', display_name: 'Dec2' }
        ]
    };
    build_display();
}
