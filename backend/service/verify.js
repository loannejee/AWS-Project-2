const util = require('../utils/util.js');
const auth = require('../utils/auth')

// verify ==================================================================
function verify(requestBody) {
    if (!requestBody.user || !requestBody.user.username || !requestBody.token) {
        return util.buildResponse(401, {
            verified: false,
            message: ' incorrect request body'
        })
    }

    // making it to this step means user, username and token exist 
    const user = requestBody.user;
    const token = requestBody.token;
    const verification = auth.verifyToken(user.username, token);

    if (!verification.verified) {
        return util.buildResponse(401, verification);
    }

    //  verified successfully:
    return util.buildResponse(200, {
        verified: true,
        message: 'success',
        user: user,
        token: token
    })
}

module.exports.verify = verify;