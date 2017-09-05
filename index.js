// Get backgrounds from reddit

const backgroundEndpoint = "https://www.reddit.com/r/EarthPorn+SpacePorn+RoomPorn+beerwithaview+telephotolandscapes/hot.json",
      request = require("request"),
      fs = require("fs");

request.get(backgroundEndpoint, function (err, res, body) {
    let i = Math.floor(Math.random() * 10),
        json = JSON.parse(body),
        imageData = json.data.children[i].data,
        image = imageData.url;

    if(imageData.preview.images.length === 0) {
        console.log("Cannot determine if image is appropraite, skipping. Please run again.");
    } else {
        let resolutions = imageData.preview.images[0].resolutions;
        if(resolutions.length < 0) {
            console.log("Cannot determine if image is appropraite, skipping. Please run again.");
        } else if(resolutions[0].height > resolutions[0].width) {
            console.log("Image is portrait, skipping. Please run again.");
        } else {
            fs.readFile('assets/bg-count.js', 'utf-8', function (err, content) {
                let bgCount = parseInt(content.replace("var bgCount = ", "").replace(";", ""));

                let path = "assets/backgrounds/" + bgCount + ".png";
                request(image).pipe(fs.createWriteStream(path)).on('close', function (err) {

                    bgCount++;
                    fs.writeFile('assets/bg-count.js', "var bgCount = " + (bgCount) + ";", function (err) {
                        console.log("Downloaded " + image);
                    });
                });
            });
        }
    }
});
