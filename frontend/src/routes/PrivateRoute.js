import React from "react";
// For react-router-dom v6, Redirect component was replaced with the Navigate component
import { Navigate } from 'react-router-dom';
import { getToken } from "../service/AuthService";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     return (
//         <Route 
//             {...rest}
//             render={props => {
//                 // If token exists:
//                 return getToken() ? <Component {...props} />
//                 // If token does NOT exist:
//                 : <Navigate to='/login' />
//             }}
//         /> 
//     )
// }

function PrivateRoute({ children }) {
    const token = getToken();
    
    if (!token) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }

    // authorized so return child components
    return children;
}

export default PrivateRoute