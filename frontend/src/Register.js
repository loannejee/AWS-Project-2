import React, { useState } from 'react'
// axios => library that serves to create HTTP requests that are present externally
import axios from 'axios';
// react-dotenv => load environment variables dynamically for your React applications created with CRA (Create-React-App).
import env from "react-dotenv";


// Interaction with the backend/server side created with AWS
// API Gateway > Stages
const REGISTER_URL = `${env.REGISTER_URL}`;
// API Gateway > API Keys
const X_API_KEY = `${env.X_API_KEY}`;


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const submitHandler = (event) => {
        // prevents event/submission from happening for testing
        event.preventDefault();

        // Make sure all the fields are not empty
        if (name.trim() === '' || email.trim() === '' || username.trim() === '' || password.trim() === '') {
            setMessage('All fields are required*')
            return;
        }

        // This will hold the API KEY
        const requestConfig = {
            headers: {
                'x-api-key': X_API_KEY
            }
        }

        // Organize all the submited inputs into an object container
        const requestBody = {
            name: name,
            username: username,
            email: email,
            password: password
        }

        // Make the client axios request to post/create new account
        // axios.post(target_url, data, custom_config)
        axios.post(REGISTER_URL, requestBody, requestConfig).then((response) => {
            // If successful:
            setMessage("Registration Successful");
        }).catch((error) => {
            // Send appropriate error:
            // 401 user/unauthorized error
            // 403 forbidden access
            if (error.response.status === 401 || error.response.status === 403) {
                // send whatever the data error returns
                setMessage(error.response.data.message)
            } else {
                // otherwise, probably a backend error
                setMessage('Sorry.....the backend server is down! Please try again later!')
            }
        })
    }

    return (
        <div>
            This is the Register Page!
            <form onSubmit={submitHandler}>
                <h5>Register</h5>
                name: <input type="text" value={name} onChange={event => setName(event.target.value)} />
                <br/>
                email: <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
                <br/>
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
                <br/>
                password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
                <br/>
                <input type="submit" value="Register" />
            </form>
            {/* If message is defined, display message on a p-tag element */}
            {message && <p className="message">{message}</p>}
        </div>
    )
}

export default Register