import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

import Profile from './Profile';

export default function Header(){
    const { isAuthenticated,loginWithRedirect  } = useAuth0();
    const userProfile = (isAuthenticated)? <Profile /> : ''
    const loginButton = (!isAuthenticated)?
     <button className="btn btn-primary" onClick={() => loginWithRedirect()}>
        <FontAwesomeIcon icon={faLock}  className="text-light icon" />
        <span className="pl-2">
            Log In
        </span>
     </button>:
     ''

    return(
        <div>
           {userProfile}
           {loginButton}
        </div>
    )
}