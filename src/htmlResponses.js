const fs = require('fs');
const path = require('path');

const getFile = (filePath, contentType, response) => {
    fs.readFile(path.join(__dirname, `../client/${filePath}`), (err, data) => {
        if (err) {
            response.writeHead(500);
            return response.end('Error loading file');
        }
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(data);
    });
};

const getClient = (request, response) => getFile('client.html', 'text/html', response);
const getCSS = (request, response) => getFile('style.css', 'text/css', response);

module.exports = {
    getClient,
    getCSS
};
