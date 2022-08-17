import {
  BrowserRouter,
  Link,
  // In react-router-dom v6, "Switch" is replaced by routes "Routes"
  // Switch 
  Routes,
  Route
} from "react-router-dom";
import Home from "./Home";
import Register from './Register';
import Login from './Login';
import PremiumContent from './PremiumContent';
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import env from "react-dotenv";
import React, { useEffect, useState } from 'react';
import { getUser, getToken, setUserSession, resetUserSession } from "./service/AuthService";
import axios from "axios";

const verifyTokenAPIURL = `${env.VERIFY_URL}`;
const X_API_KEY = `${env.X_API_KEY}`;

function App() {
  const [isAuthenticating, setAuthenticating] = useState(true);

  // As soon as component mounts
  useEffect(() => {
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
      return;
    }

    const requestConfig = {
      headers: {
        'x-api-key': X_API_KEY
      }
    }

    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyTokenAPIURL, requestBody, requestConfig).then((response) => {
      setUserSession(response.data.user, response.data.token);
      setAuthenticating(false);
    }).catch(() => {
      resetUserSession();
      setAuthenticating(false);
    })

  }, [])

  const token = getToken();
  if (isAuthenticating && token) {
    return <div className="content">Authenticating...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        {/* BrowserRouter keeps your UI in sync with the URL */}
        <div className="header">
          {/* Setting up the links */}
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/premium-content">Premium Content</Link>
        </div>

        <div className='content'>
          {/* For react-router-dom v6, <Switch>/<Routes> tag looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Routes>

            {/* Components and their URLs here: */}
            <Route exact path="/" element={<Home />} />

            {/* Redirect route */}
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
            />

            {/* Redirect route */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
            />

            {/* Protect route */}
            <Route path="/premium-content" element={
              <PrivateRoute>
                <PremiumContent />
              </PrivateRoute>
            }
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
