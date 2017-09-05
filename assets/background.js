function get_background() {
    var i = Math.floor(Math.random() * bgCount);
    image = "assets/backgrounds/" + i + ".png",
        loader = document.createElement('img');

    loader.setAttribute('src', image);
    loader.onload = function() {
        document.getElementsByTagName('body')[0].style.backgroundImage = "url(" + image + ")";
    };
}
