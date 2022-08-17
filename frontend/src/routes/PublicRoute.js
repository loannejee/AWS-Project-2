import React from "react";
import { Redirect, Route } from 'react-router-dom';
import { getToken } from "../service/AuthService";

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props => {
                // If token does not exist:
                return !getToken() ? <Component {...props} />
                // If token exists:
                : <Redirect to={{ pathname: '/premium-content'}} />
            }}
        /> 
    )
}

export default PublicRoute