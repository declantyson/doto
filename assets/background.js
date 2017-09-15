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
        source = "assets/backgrounds-cinemagraphs/" + i + ".mp4",
        video = document.createElement('video');

    video.setAttribute('src', source);
    video.onloadeddata = function () {
        var bgVideo = document.getElementById('cinematic-video');
        bgVideo.setAttribute('src', source);
        bgVideo.className = "visible";

        console.log("!");
    };
}
