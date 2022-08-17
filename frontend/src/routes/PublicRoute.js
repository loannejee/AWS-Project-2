import React from "react";
// For react-router-dom v6, Redirect component was replaced with the Navigate component
import { Navigate } from 'react-router-dom';
import { getToken } from "../service/AuthService";

// const PublicRoute = ({ component: Component, ...rest }) => {
//     return (
//         <Route 
//             {...rest}
//             render={props => { 
//                 // If token does not exist:
//                 return !getToken() ? <Component {...props} />
//                 // If token exists, element = :
//                 : <Navigate to='/premium-content' />
//             }}
//         /> 
//     )
// }

function PublicRoute({ children }) {
    const token = getToken();
    
    if (token) {
        // if logged in, redirect to premium-content page
        return <Navigate to="/premium-content" />
    }

    // authorized so return child components
    return children;
}

export default PublicRoute