function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        // 'Access-Control-Allow-Origin' to be everything
        // The client will have a different url than the API endpoint
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

module.exports.buildResponse = buildResponse;