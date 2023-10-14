import { useContext, useEffect, useState } from "react"
import { authContext } from "../../Context/Authentication"
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(authContext);
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  useEffect(() => {
    if (!token&&!localStorage.getItem("token")) {
      setIsAuthenticated(false);
    }else{
      setIsAuthenticated(true);
    }
  }, [])
 
  return <>
    {isAuthenticated ? children : <Navigate to="/login" />}
  </>
}
