function get_cinematic_background() {
    var i = Math.floor(Math.random() * cinematic_bg_count),
        src = 'assets/backgrounds/' + i + '.mp4',
        video = document.createElement('video'),
        source = document.createElement('source');
    
    var bgVideo = document.getElementById('cinematic-video');
    source.setAttribute('src', src);
    bgVideo.appendChild(source);
    bgVideo.className = 'visible';
}
