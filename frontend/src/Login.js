import React, {useState} from 'react';
// axios => library that serves to create HTTP requests that are present externally
import axios from 'axios';
// react-dotenv => load environment variables dynamically for your React applications created with CRA (Create-React-App).
import env from "react-dotenv";


// Interaction with the backend/server side created with AWS
// API Gateway > Stages
const LOGIN_URL = `${env.LOGIN_URL}`;
// API Gateway > API Keys
const X_API_KEY = `${env.X_API_KEY}`;

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const submitHandler = (event) => {
        // prevents event/submission from happening for testing
        event.preventDefault();

        // Make sure all the fields are not empty
        if (username.trim() === '' || password.trim() === '') {
            setErrorMessage('Both username and password are required*')
            return;
        }

        // If the error message above was set, reset the message to null
        setErrorMessage(null)

        // This will hold the API KEY
        const requestConfig = {
            headers: {
                'x-api-key': X_API_KEY
            }
        }

        // Organize all the submited inputs into an object container
        const requestBody = {
            username: username,
            password: password
        }

        // Make the client axios request to post/create new account
        // axios.post(target_url, data, custom_config)
        axios.post(LOGIN_URL, requestBody, requestConfig).then((response) => {
            // If successful:
            setErrorMessage("Login Successful");
        }).catch((error) => {
            // Send appropriate error:
            // 401 user/unauthorized error
            // 403 forbidden access
            if (error.response.status === 401 || error.response.status === 403) {
                // send whatever the data error returns
                setErrorMessage(error.response.data.message)
            } else {
                // otherwise, probably a backend error
                setErrorMessage('Sorry.....the backend server is down! Please try again later!')
            }
        })
    }

  return (
    <div>This is the Login Page!
        <form onSubmit={submitHandler}>
                <h5>Login</h5>
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
                <br/>
                password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
                <br/>
                <input type="submit" value="Login" />
            </form>
            {/* If message is defined, display message on a p-tag element */}
            {errorMessage && <p className="message">{errorMessage}</p>}
    </div>
  )
}

export default Login