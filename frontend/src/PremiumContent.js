import React from 'react';
import { getUser, resetUserSession} from './service/AuthService'

function PremiumContent(props) {
  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';

  const logoutHandler = () => {
    resetUserSession();
    props.history.push('/login')
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