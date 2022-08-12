const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
})
const util = require('../utils/util.js');
const bcrypt = require('bcryptjs');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'jinmeister-jl-users';

// register ===================================================================
async function register(userInfo) {
    const name = userInfo.name;
    const email = userInfo.email;
    const username = userInfo.username;
    const password = userInfo.password;

    if (!username || !name || !email || !password) {
        return util.buildResponse(401, {
            message: 'All fields are required'
        })
    }

    const dynamoUser = await getUser(username.toLowerCase().trim());
    // for registration, check if user and username already exist in the database to prevent duplicates
    if (dynamoUser && dynamoUser.username) {
        return util.buildResponse(401, {
            message: 'username already exists in our database. please choose a different username'
        })
    }

    // Trim incase we have whitespace 
    // 10 rounds
    const encryptedPW = bcrypt.hashSync(password.trim(), 10);
    // This is for saving in our database
    const user = {
        name: name,
        email: email,
        // username is made lowercase for simplicity sake
        username: username.toLowerCase().trim(),
        password: encryptedPW
    }

    const saveUserResponse = await saveUser(user);
    // If error:
    if (!saveUserResponse) {
        return util.buildResponse(503, {
            message: 'Sever Error. Please try again later.'
        })
    }
    // Successful:
    return util.buildResponse(200, {username: username });
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
    }, error => {
        console.error('There is an error getting user: ', error)
    })
}

// saveUser ===============================================================
async function saveUser(user) {
    const params = {
        TableName: userTable,
        Item: user
    }

    return await dynamodb.put(params).promise().then(() => {
        return true;
    }, error => {
        console.error('There is an error saving user: ', error);
    })
}

// You only need to export the register function so that other modules can use it
module.exports.register = register;