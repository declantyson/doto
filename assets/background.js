function get_cinematic_background() {
    var i = Math.floor(Math.random() * (backgrounds.length - 1)),
        src = 'assets/backgrounds/' + backgrounds[i],
        video = document.createElement('video'),
        source = document.createElement('source');

    var bgVideo = document.getElementById('cinematic-video');
    source.setAttribute('src', src);
    bgVideo.appendChild(source);
    bgVideo.className = 'visible';
}
