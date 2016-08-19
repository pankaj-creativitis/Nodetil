'use strict';
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
let mimes = {
    '.htm' : 'text/html',
    '.css' : 'text/css',
    '.js' : 'text/javascript',
    '.gif' : 'text/gif',
    '.jpg' : 'text/jpg',
    '.png' : 'text/png'
}

function fileAccess(filepath) {
    return new Promise((resolve, reject) => {
        fs.access(filepath, fs.F_OK, error => {
            if(!error){
                resolve(filepath);
            } else {
                reject(error);
            }
        });
    });
}

// Not so efficient way of reading the file
// function fileReader(filepath) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filepath, (error, content) =>{
//             if(!error){
//                 resolve(content);
//             } else {
//                 reject(error);
//             }
//         });
//     });
// }

// filStream way (an efficient way of reading files)
function streamFile(filepath){
    return new Promise((resolve, reject) => {
        let fileStream = fs.createReadStream(filepath);
        fileStream.on('open', () => {
            resolve(fileStream);
        });
        
        fileStream.on('error', error => {
            reject(error);
        });
    });
}

function webServer(req, res) {
    let baseURI = url.parse(req.url);
    // let filepath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
    let filepath = baseURI.pathname === "/" ? path.join(__dirname, "index.htm") : path.join(__dirname, baseURI.pathname);

    let contentType = mimes[path.extname(filepath)];

fileAccess(filepath)
    .then(streamFile)
    .then(fileStream => {
        res.writeHead(200,{'Content-type' : contentType, bufferSize: 64 * 1024});
        fileStream.pipe(res);
        //  res.end(content, 'utf-8');
    })
    .catch(error => {
        res.writeHead(404);
        res.end(JSON.stringify(error));
    });

}
http.createServer(webServer).listen(3000, () => console.log('server started on port 3000'));