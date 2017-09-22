// Get backgrounds from reddit

const cinematicBackgroundEndpoint = "https://www.reddit.com/r/cinemagraphs/hot.json",
      request = require("request"),
      fs = require("fs"),
      jsdom = require("jsdom"),
      { JSDOM } = jsdom;

let retries = 5;

const updateBackground = (endpoint, var_name) => {
        request.get(endpoint, function (err, res, body) {
        let i = Math.floor(Math.random() * 10),
            json = JSON.parse(body),
            sourceData = json.data.children[i].data,
            source = sourceData.url;

        if(typeof sourceData.preview === "undefined") {
            console.log("Cannot determine if source is appropriate, skipping. Retrying.");
            retries--;
            tryDownload();
        } else if (sourceData.preview.images.length === 0) {
            console.log("Cannot determine if source is appropriate, skipping. Retrying.");
            retries--;
            tryDownload();
        } else {
            let resolutions = sourceData.preview.images[0].resolutions;
            if (resolutions.length < 0) {
                console.log("Cannot determine if source is appropriate, skipping. Retrying.");
                retries--;
                tryDownload();
            } else if (resolutions[0].height > resolutions[0].width) {
                console.log("Source is portrait, skipping. Retrying.");
                retries--;
                tryDownload();
            } else {
                let urlComponents = source.split('.'),
                    format = urlComponents[urlComponents.length - 1];

                if(["mp4", "gifv"].indexOf(format) === -1) {
                    console.log("Source is not appropriate format. Retrying.");
                    retries--;
                    tryDownload();
                } else {
                    if(format === "gifv") {
                        //  get mp4 source from gifv
                        request(source, (err, response, body) => {
                            let dom = new JSDOM(body),
                                sourceEl = dom.window.document.querySelector('source');
                            if(sourceEl === null) {
                                console.log("Sorry, something went wrong. Retrying.");
                                retries--;
                                tryDownload();
                            } else {
                                source = `http:${sourceEl.getAttribute('src')}`;
                                fs.readFile(`assets/${var_name}.js`, 'utf-8', function (err, content) {
                                    let count = parseInt(content.replace(`var ${var_name} = `, "").replace(";", "")),
                                        path = `assets/backgrounds/${count}.mp4`;
                                    request(source).pipe(fs.createWriteStream(path)).on('close', (err) => {
                                        count++;
                                        fs.writeFile(`assets/${var_name}.js`, `var ${var_name} = ${count};`, (err) => {
                                            console.log("Downloaded " + source);
                                        });
                                    });
                                });
                            }
                        });
                    } else {
                        fs.readFile(`assets/${var_name}.js`, 'utf-8', function (err, content) {
                            let count = parseInt(content.replace(`var ${var_name} = `, "").replace(";", "")),
                                path = `assets/backgrounds/${count}.mp4`;
                            request(source).pipe(fs.createWriteStream(path)).on('close', (err) => {
                                count++;
                                fs.writeFile(`assets/${var_name}.js`, `var ${var_name} = ${count};`, (err) => {
                                    console.log("Downloaded " + source);
                                });
                            });
                        });
                    }
                }
            }
        }
    });
};

const tryDownload = () => {
    if(retries > 0) {
        updateBackground(cinematicBackgroundEndpoint, "cinematic_bg_count");
    } else {
        console.error("Fucking failed m8");
    }
};


tryDownload();
