const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function download(url, filename) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const dir = path.join(__dirname, 'memes');
    
    // Check if the directory exists, if not, create it
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    fs.writeFile(path.join(dir, filename), buffer, (err) => {
        if (err) throw err;
        console.log('finished writing file: ' + filename);
    });
}

module.exports = {
    download
}
