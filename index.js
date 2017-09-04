// Get backgrounds from reddit

const backgroundEndpoint = "https://www.reddit.com/r/EarthPorn+SpacePorn+RoomPorn/hot.json",
      request = require("request"),
      fs = require("fs");

request.get(backgroundEndpoint, function (err, res, body) {
    let i = Math.floor(Math.random() * 10),
        json = JSON.parse(body),
        image = json.data.children[i].data.url;

    fs.readFile('assets/bg-count.js', 'utf-8', function (err, content) {
        let bgCount = parseInt(content.replace("var bgCount = ", "").replace(";", ""));

        fs.writeFile('assets/bg-count.js', "var bgCount = " + (bgCount + 1) + ";", function (err) {
            let path = "assets/backgrounds/" + bgCount + ".png";
            request(image).pipe(fs.createWriteStream(path)).on('close', function (err) {
                console.log("Downloaded " + image);
            });
        });
    });
});