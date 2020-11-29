import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SplitButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


//import LoginButton  from './LoginButton';
//import LogoutButton  from './LogoutButton';


const Profile = () => {
  const { user, isAuthenticated,loginWithRedirect, getAccessTokenSilently,logout } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-3po6wuns.us.auth0.com";
  
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://dev-3po6wuns.us.auth0.com/api/v2/`,
          scope: "read:current_user",
          prompt: "none"
        });

        localStorage.setItem('token',accessToken);
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
  
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, []);

  if(isAuthenticated){
    return(

            <SplitButton
            id={`dropdown-split-variants-primary`}
            variant='primary'
            title={
                <FontAwesomeIcon icon={faUser}  className="text-light icon" />
            }
          >
            

            <div style={{margin:"0px auto",width:"130px"}} className="p0">
              <center>
                <img src={user.picture} alt={user.name} width="125px" height="125px" />
                <p className="p-2 dont-break-out">
                  {user.email}
                </p>
                <button className="btn btn-secondary" onClick={() => {
                  logout({ returnTo: window.location.origin });
                  localStorage.setItem('token','');

                  }}>
                  <FontAwesomeIcon icon={faSignOutAlt}  className="text-light icon" />
                  <span className="pl-2">
                    Log Out
                  </span>
                </button>
              </center>
            </div>

          </SplitButton>

    )
  }



};

export default Profile;