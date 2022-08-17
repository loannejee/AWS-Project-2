import React from 'react';
import { getUser, resetUserSession} from './service/AuthService';
import { useNavigate } from 'react-router-dom';

function PremiumContent(props) {
  const user = getUser();
  // If user is NOT undefined AND user exists, then get the user's name. Else return empty string.
  const name = user !== 'undefined' && user ? user.name : '';
  // *** For react-router-dom v6, useHistory is now useNavigate
  const navigate = useNavigate();

  const logoutHandler = () => {
    resetUserSession();
    navigate('/login')
  }
  
  return (
    <div>
      This is the Premium Content Page!
      <br/>
      Hello {name}! You have been logged in!
      <br/>
      <input type="button" value="Logout" onClick={logoutHandler} />
    </div>
  )
}

export default PremiumContent