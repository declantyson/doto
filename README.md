# Doto

![Doto](https://github.com/declantyson/doto/raw/master/sample.gif "Doto")

[declantyson.github.io/doto/](http://declantyson.github.io/doto/)

## Installation

### As a login screen

1. Install [lightdm](https://wiki.archlinux.org/index.php/LightDM) as your session manager
2. Install [lightdm-webkit2-greeter](http://antergos.github.io/web-greeter/)
3. Download and save this repository into your `lightdm-webkit2-greeter` themes directory, normally located at `usr/share/lightdm-webkit/themes/`
4. Change your `lightdm-webkit2-greeter` conf file (normally located at `/etc/lightdm/lightdm-webkit2-greeter.conf` to the following:

```
[greeter]
  webkit_theme        = doto
```

### As a chrome extension

You can use Doto as your new tab page by navigating to chrome://extensions/ and clicking `Load unpacked extension`. 

## Obtaining more cinemagraphs

There's a handy npm script which browses [/r/Cinemagraphs](https://reddit.com/r/Cinemagraphs) and scrapes appropriately sized and formatted files. Just run `npm start` in the folder directory.

Alternatively save any mp4s you like in the `/assets/backgrounds` directory. They are numerically indexed. In order to ensure your new file is displayed update `/assets/cinematic_bg_count.js` to show the new total.

## Changing the news/weather sources

Edit `/assets/widgets.js` to point to your location, metrics and new sources.

- Weather is fed by [OpenWeatherMap](https://openweathermap.org/current).
- News is sourced by [News API](https://newsapi.org/abc-news-au-api).

It is recommended you also obtain your own API keys to avoid any traffic bursts.
