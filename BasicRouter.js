'use strict';
const http = require('http');
const url = require('url');

let routes = {
    'GET' : {
        '/' : (req, res) => {
                res.writeHead(200, {'content-type':'text/html'});
                res.end('<h1>Basic Router!</h1>');
        }, 
            '/about' : (req, res) => {
                res.writeHead(200, {'content-type' : 'text/html'});
                res.end('<h1>About Page</h1>');
            }
        },
    'POST' : {

    },
    'NA' : (req, res) => {
            res.writeHead(404);
        res.end('content not found!');
    }
}

function router(req, res){
    let baseUri = url.parse(req.url, true);
    console.log('baseUri : ',baseUri);
    let resolveRoute = routes[req.method][baseUri.pathname];
    if(resolveRoute!=undefined){
        resolveRoute(req, res);
    } else {
        routes['NA'](req,res);
    }
}

http.createServer(router)
.listen(3000, () => {console.log('server running on port 3000')
});