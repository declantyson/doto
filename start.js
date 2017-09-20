get_cinematic_background();
initialize_clock();
weather();

setInterval(weather, 5000);

if(typeof lightdm !== "undefined") {
    build_display();
}
