const createResponse = (statusCode, message, id, accept) => {
    if (accept === 'text/xml') {
      let xml = `<response><message>${message}</message>`;
      if (id) xml += `<id>${id}</id>`;
      xml += `</response>`;
      return xml;
    }
    return JSON.stringify(id ? { message, id } : { message });
  };
  
  const handleResponse = (request, response, statusCode, message, id = null) => {
    const accept = request.headers.accept || 'application/json';
    const responseBody = createResponse(statusCode, message, id, accept);
    
    response.writeHead(statusCode, { 'Content-Type': accept });
    console.log(responseBody);
    response.end(responseBody);
  };
  
  const success = (req, res) => handleResponse(req, res, 200, 'Request was successful');
  const badRequest = (req, res) => {
    const { valid } = new URL(req.url, `http://${req.headers.host}`).searchParams;
    if (valid === 'true') {
      handleResponse(req, res, 200, 'Valid request received');
    } else {
      handleResponse(req, res, 400, 'Missing valid query parameter', 'badRequest');
    }
  };
  const unauthorized = (req, res) => {
    const { loggedIn } = new URL(req.url, `http://${req.headers.host}`).searchParams;
    if (loggedIn === 'yes') {
      handleResponse(req, res, 200, 'Logged in successfully');
    } else {
      handleResponse(req, res, 401, 'Unauthorized access', 'unauthorized');
    }
  };
  const forbidden = (req, res) => handleResponse(req, res, 403, 'Access forbidden', 'forbidden');
  const internal = (req, res) => handleResponse(req, res, 500, 'Internal server error', 'internal');
  const notImplemented = (req, res) => handleResponse(req, res, 501, 'Feature not implemented', 'notImplemented');
  const notFound = (req, res) => handleResponse(req, res, 404, 'Page not found', 'notFound');
  
  module.exports = { success, badRequest, unauthorized, forbidden, internal, notImplemented, notFound };
  