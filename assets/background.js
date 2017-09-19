function get_background() {
    var i = Math.floor(Math.random() * bgCount),
        image = "assets/backgrounds/" + i + ".png",
        loader = document.createElement('img');

    loader.setAttribute('src', image);
    loader.onload = function() {
        document.getElementsByTagName('body')[0].style.backgroundImage = "url(" + image + ")";
    };
}

function get_cinematic_background() {
    var i = Math.floor(Math.random() * cinematicBgCount),
        src = "assets/backgrounds-cinemagraphs/" + i + ".mp4",
        video = document.createElement('video'),
        source = document.createElement('source');
    
    var bgVideo = document.getElementById('cinematic-video');
    source.setAttribute('src', src);
    bgVideo.appendChild(source);
    bgVideo.className = "visible";
}
