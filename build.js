const fs = require('fs');

const buildBackgroundsJsFile = () => {
  fs.readdir('assets/backgrounds', (err, items) => {
    const filteredItems = items.filter(item => item !== '.DS_Store');

    if(err) console.error(err);
    let itemsArr = `var backgrounds = ${JSON.stringify(filteredItems).replace(/"/g, '\'')};`;
    fs.writeFile('assets/backgrounds.js', itemsArr, (err) => {
      if(err) console.error(err);
    });
  });
};

module.exports = buildBackgroundsJsFile;