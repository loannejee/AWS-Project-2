import React from "react";
import { Redirect, Route } from 'react-router-dom';
import { getToken } from "../service/AuthService";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props => {
                // If token exists:
                return getToken() ? <Component {...props} />
                // If token does NOT exist:
                : <Redirect to={{ pathname: '/login'}} />
            }}
        /> 
    )
}

export default PrivateRoute