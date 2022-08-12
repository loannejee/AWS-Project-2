const registerService = './service/register';
const loginService = './service/login';
const verifyService = './service/verify';

const util = require('./utils/util.js')

// First, we're going to define some path parameters:
const healthPath = '/health';
const registerPath = '/register';
const loginPath = '/login';
const verifyPath = '/verify';

exports.handler = async (event) => {
    console.log('Request Event: ', event);
    let response;
    switch (true) {
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = util.buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === registerPath:
            // extract register body from the event
            const registerBody = JSON.parse(event.body)
            // need to include await since we are dealing with dynamo operations
            response = await registerService.register(registerBody);
            break;
        case event.httpMethod === 'POST' && event.path === loginPath:
            const loginBody = JSON.parse(event.body)
            response = await loginService.login(loginBody);
            break;
        case event.httpMethod === 'POST' && event.path === verifyPath:
            const verifyBody = JSON.parse(event.body)
            response = await verifyService.verify(verifyBody);
            break;
        default:
            response = util.buildResponse(404, '404 Not Found');
    }
    return response;
};