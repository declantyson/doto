function tick() {
    var separator = document.getElementById('clock_separator');
    separator.style.visibility = "visible";
    updateTime();

    setTimeout(tock, 1000);
}

function tock() {
    var separator = document.getElementById('clock_separator');
    separator.style.visibility = "hidden";
    updateTime();

    setTimeout(tick, 1000);
}

function initialize_clock() {
    var clock = document.createElement('div'),
        hours = document.createElement('div'),
        separator = document.createElement('div'),
        minutes = document.createElement('div');

    clock.id = "clock";
    hours.id = "clock_hours";
    minutes.id = "clock_minutes";

    separator.id = "clock_separator";
    separator.innerText = ":";

    clock.appendChild(hours);
    clock.appendChild(separator);
    clock.appendChild(minutes);

    document.getElementById('content').appendChild(clock);
    tick();
}

function updateTime() {
    var hours = document.getElementById('clock_hours'),
        minutes = document.getElementById('clock_minutes'),
        now = new Date();

    var hourDisplay = now.getHours();
    if(hourDisplay < 10) hourDisplay = "0" + hourDisplay;

    var minuteDisplay = now.getMinutes();
    if(minuteDisplay < 10) minuteDisplay = "0" + minuteDisplay;

    hours.innerText = hourDisplay;
    minutes.innerText = minuteDisplay;
}
