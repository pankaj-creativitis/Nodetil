'use strict';
const http = require('http');
const url = require('url');
const qs = require('querystring');

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
        '/api/login' : (req, res) => {
            let body = '';
            req.on('data', data => {
                body += data;
                if(body.length>60000){
                    res.writeHead(413, {'content-type' : 'text/html'});
                    res.end('<h3>Error: File length exceeds the specified limit</h3>',
                    () => req.connection.destroy());
                }
            });

            req.on('end', () => {
                let params = qs.parse(body);
                console.log(params['username']);
                console.log(params['password']);
                res.end();
            });
        }
    },
    'NA' : (req, res) => {
            res.writeHead(404);
        res.end('content not found!');
    }
}

function router(req, res){
    let baseUri = url.parse(req.url, true);
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