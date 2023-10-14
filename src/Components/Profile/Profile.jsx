import React, { useContext, useEffect, useState } from 'react'
import Style from './Profile.module.css'
import { PacmanLoader } from 'react-spinners';
import jwtDecode from 'jwt-decode';
import { authContext } from '../../Context/Authentication';
export default function Profile() {
  const [username, setUsername] = useState("");
  const { token } = useContext(authContext);
  useEffect(() => {
    if (token) {
      const { name } = jwtDecode(token);
      setUsername(name);
    }
  }, [token]);

  if (!username) {
    return <>
      <div className='d-flex justify-content-center align-items-center min-vh-100'>
        <PacmanLoader color="#36d7b7" />
      </div>
    </>
  }
  return <>
    <div className="container text-center min-vh-100 py-5">
      <h1>Welcome {username}</h1>
    </div>
  </>
}
