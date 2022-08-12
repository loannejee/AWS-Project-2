const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
})
const util = require('../utils/util.js');
const bcrypt = require('bcryptjs');
const auth = require('../utils/auth')

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'jinmeister-jl-users';

// login ===================================================================
async function login(user) {
    const username = user.username;
    const password = user.password;
    if (!user || !username || !password) {
        return util.buildResponse(401, {
            message: 'username and password are required'
        })
    }

    // check if this user exist in the database
    const dynamoUser = await getUser(username.toLowerCase().trim());
    if (dynamoUser && dynamoUser.username) {
        return util.buildResponse(401, {
            message: 'username does not exist'
        })
    }

    // if user exists in the database, next, check if the input password is correct
    if (!bcrypt.compareSync(password, dynamoUser.password)) {
        return util.buildResponse(403, {
            message: 'password is incorrect'
        });
    }

    const userInfo = {
        username: dynamoUser.username,
        name: dynamoUser.name
    }

    const token = auth.generateToken(userInfo);

    const response = {
        user: userInfo,
        token: token
    }
    return util.buildResponse(200, response)
}


// getUser ================================================================
async function getUser(username) {
    const params = {
        TableName: userTable,
        Key: {
            username: username
        }
    }

    return await dynamodb.get(params).promise().then((response) => {
        return response.Item;
    }, (error) => {
        console.error('There is an error getting user: ', error)
    })
}

module.exports.login = login;