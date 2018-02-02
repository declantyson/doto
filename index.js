// Get backgrounds from reddit

const endpoint       = 'https://www.reddit.com/r/cinemagraphs/hot.json',
      request        = require('request'),
      fs             = require('fs'),
      videofy        = require('videofy-plus'),
      jsdom          = require('jsdom'),
      { JSDOM }      = jsdom,
      reasons        = {
          START                 : 'Starting download.',
          CANNOT_DETERMINE      : 'Cannot determine if source is appropriate, skipping.',
          INCORRECT_ORIENTATION : 'Source is portrait, skipping.',
          DISALLOWED_FORMAT     : 'Source is not appropriate format.',
          SOMETHING_BAD         : 'Sorry, something went wrong.'
      };

let retries = 5,
    allowedFormats = ['mp4', 'gifv'];

// Also download gifs. Currently not a default options as there's some conversion issues.
if(process.env.npm_config_gif) allowedFormats.push('gif');

const tryDownload = (reason) => {
    console.log(reason);
    retries--;
    if(retries > 0) {
        console.log(`${retries} retries remaining.\n`);
        updateBackground(endpoint);
    } else {
        console.error(reasons.SOMETHING_BAD);
    }
};

const buildBackgroundsJsFile = () => {
    fs.readdir('assets/backgrounds', (err, items) => {
        if(err) console.error(err);
        let itemsArr = `var backgrounds = ${JSON.stringify(items).replace(/"/g, '\'')};`;
        fs.writeFile('assets/backgrounds.js', itemsArr, (err) => {
            if(err) console.error(err);
        });
    });
};

const updateBackground = (endpoint) => {
    request.get(endpoint, function (err, res, body) {
        let i = Math.floor(Math.random() * 10),
            json = JSON.parse(body),
            sourceData = json.data.children[i].data,
            source = sourceData.url;

        if(typeof sourceData.preview === 'undefined' || sourceData.preview.images.length === 0) tryDownload(reasons.CANNOT_DETERMINE);
        else {
            let resolutions = sourceData.preview.images[0].resolutions;

            if (resolutions.length < 0) tryDownload(reasons.CANNOT_DETERMINE);
            else if (resolutions[0].height > resolutions[0].width) tryDownload(reasons.INCORRECT_ORIENTATION);
            else {
                let urlComponents = source.split('/'),
                    filename = urlComponents[urlComponents.length - 1],
                    filenameComponents = filename.split('.'),
                    format = filenameComponents[filenameComponents.length - 1],
                    path = `assets/backgrounds/${filenameComponents[0]}.${format}`;

                if (allowedFormats.indexOf(format) === -1) tryDownload(reasons.DISALLOWED_FORMAT);

                else {
                    if(format === 'gif') {
                        // convert gif files to mp4

                        request(source).pipe(fs.createWriteStream(path)).on('close', (err) => {
                            console.log(`Downloaded ${source} -> Converting to mp4...`);
                            videofy(path, path.replace('gif', 'mp4'), { rate: 30 }, (err) => {
                                if (err) console.error(err);
                                else {
                                    fs.unlink(path, (err) => {
                                        if (err) console.error(err);
                                        buildBackgroundsJsFile();
                                    });
                                }
                            });
                        });

                    } else if(format === 'gifv') {
                        //  get mp4 source from gifv

                        request(source, (err, response, body) => {
                            let dom = new JSDOM(body),
                                sourceEl = dom.window.document.querySelector('source');

                            if (sourceEl === null) tryDownload(reasons.SOMETHING_BAD);
                            else {
                                source = `http:${sourceEl.getAttribute('src')}`,
                                path = path.replace('gifv', 'mp4');
                                request(source).pipe(fs.createWriteStream(path)).on('close', (err) => {
                                    if(err) console.error(err);

                                    buildBackgroundsJsFile();
                                    console.log('Downloaded ' + source);
                                });
                            }
                        });

                    } else {
                        // Just save the file

                        request(source).pipe(fs.createWriteStream(path)).on('close', (err) => {
                            if(err) console.error(err);

                            console.log('Downloaded ' + source);
                            buildBackgroundsJsFile();
                        });
                    }
                }
            }
        }
    });
};

tryDownload(reasons.START);