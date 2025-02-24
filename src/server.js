const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const apiHandler = require('./apiResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    console.log(request.url);

    switch (request.url) {
        case '/':
        case 'client.html':
            htmlHandler.getClient(request, response);
            break;
        case '/style.css':
            htmlHandler.getCSS(request, response);
            break;
        case '/success':
            apiHandler.success(request, response);
            break;
        case '/badRequest':
            apiHandler.badRequest(request, response);
            break;
        case '/unauthorized':
            apiHandler.unauthorized(request, response);
            break;
        case '/forbidden':
            apiHandler.forbidden(request, response);
            break;
        case '/internal':
            apiHandler.internal(request, response);
            break;
        case '/notImplemented':
            apiHandler.notImplemented(request, response);
            break;
        default:
            apiHandler.notFound(request, response);
            break;
    }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});