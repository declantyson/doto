# Doto

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/12451938491d4b7d97105a35f835e4cf)](https://www.codacy.com/app/declantyson/doto?utm_source=github.com&utm_medium=referral&utm_content=declantyson/doto&utm_campaign=badger)

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
  secure              = false
  webkit_theme        = doto
```

5. If you cannot log-in, try changing the following in your `lightdm` conf (normally located at `/etc/lightdm/lightdm.conf`):

```
[Seat:*]
# under this setting or its equivalent
# change the user-session to your preferred session or DE
# available sessions are usually found at /usr/share/xsessions
# for example:
user-session=bspwm
```


### As a chrome extension

You can use Doto as your new tab page by navigating to chrome://extensions/ and clicking `Load unpacked extension`.

## Obtaining more cinemagraphs

There's a handy npm script which browses [/r/Cinemagraphs](https://reddit.com/r/Cinemagraphs) and scrapes appropriately sized and formatted files. Just run `./download.sh` in the folder directory.

Alternatively save any mp4s you like in the `/assets/backgrounds` directory. They are numerically indexed. In order to ensure your new file is displayed update `/assets/cinematic_bg_count.js` to show the new total.

## Changing the news/weather sources

Edit `settings.js` to point to your location, units and new sources.

- Weather is fed by [OpenWeatherMap](https://openweathermap.org/current).
- News is sourced by [News API](https://newsapi.org/abc-news-au-api).

It is recommended you also obtain your own API keys to avoid any traffic bursts.

## Contributor thanks

- [systemplado](https://github.com/systemplado)
- [irfan798](https://github.com/irfan798)
