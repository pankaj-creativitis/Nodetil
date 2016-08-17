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

function webServer(req, res) {
    let baseURI = url.parse(req.url);
    let filepath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
    console.log('filepath: '+ filepath)
    // attempt to access the file
    fs.access(filepath, fs.F_OK, error => {
        if(!error){
            fs.readFile(filepath, (error, content) =>{
                if(!error){
                    // resolve the filetype
                    let contentType = mimes[path.extname(filepath)];

                    // serve the content
                    res.writeHead(200, {'content-type' : contentType});
                    res.end(content);
                } else {
                    res.writeHead(500);
                    res.end('<h2>file not readable!</h2>')
                }
            });
        } else {
            // access failed return a 404 error
            res.writeHead(404)
            res.end('<h2>File not found</h2>');
        }
    });
}
http.createServer(webServer).listen(3000, () => {console.log('server started on port 3000')
});