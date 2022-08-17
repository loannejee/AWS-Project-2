// All the authorization-related functions that can be used throughout the project shall be defined here: 
module.exports = {
    getUser: function() {
        // Unlike local storage, session storage only keeps data for a particular session
        const user = sessionStorage.getItem('user');
        if (user === 'undefined' || !user) {
            return null;
        } else {
            //  JSON parsing is the process of converting a JSON object in text format to a Javascript object that can be used inside a program
            return JSON.parse(user);
        }
    },

    getToken: function() {
        return sessionStorage.getItem('token');
    },

    setUserSession: function(user, token) {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);
    },

    resetUserSession: function() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    }
}