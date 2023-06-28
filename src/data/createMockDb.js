const path = require('path');
const fs = require('fs');
const mockData = require('./data.ts');

const data = JSON.stringify(mockData);
const filePath = path.join(__dirname, 'db.json');

fs.writeFile(filePath, data, function (err) {
    err ? console.log(err) : console.log('db created');
});
