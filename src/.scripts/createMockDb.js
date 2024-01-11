const path = require('path');
const fs = require('fs');
const mockData = require('../data/data.js');

const data = JSON.stringify(mockData);
const filePath = path.join(__dirname, '../data/db.json');

fs.writeFile(filePath, data, function (err) {
    console.log(err ?? 'db created');
});
