// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Create server
http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    if (pathname === '/') {
        showForm(request, response);
    } else if (pathname === '/post') {
        saveComment(request, response);
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('404 Not Found');
    }
}).listen(8080, 'localhost');

// Show form
function showForm(request, response) {
    // Read form.html
    fs.readFile('form.html', function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
}

// Save comment
function saveComment(request, response) {
    var reqBody = '';
    request.on('data', function (data) {
        reqBody += data;
    });
    request.on('end', function () {
        var form = qs.parse(reqBody);
        var comment = {
            name: form.name,
            comment: form.comment
        };
        console.log(comment);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Thank you for your comment!');
    });
}
console.log('Server running at http://localhost:8080');