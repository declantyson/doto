get_cinematic_background();
initialize_clock();
weather();
news();

setInterval(weather, 5000);
setInterval(news, 5000);

if(typeof lightdm !== "undefined") {
    build_display();
}
