const jwt = require('jsonwebtoken');

// generateToken ===========================================================
function generateToken(userInfo) {
    if (!userInfo) {
        return null;
    }
    // if userInfo exists, pass in the secret key for the token
    return jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}

// verifyToken ============================================================
function verifyToken(username, token) {
    // check user's token matches with the one from database
    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        if (error) {
            return {
                verified: false,
                message: 'invalid token'
            }
        }

        if (response.username !== username) {
            return {
                verified: false,
                message: 'invalid user'
            }
        }

        return {
            verified: true,
            message: 'verified'
        }
    })
}

module.exports.generateToken = generateToken
module.exports.verifyToken = verifyToken