'use strict';
const http = require('http');

function router(req, res){
    res.writeHead(200, {'content-type':'html'});
    res.end('<h1>Basic Router!</h1>')
}

http.createServer(router)
.listen(3000, () => {console.log('server running on port 3000')
});