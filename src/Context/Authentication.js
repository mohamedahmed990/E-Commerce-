import React, { createContext, useEffect, useState } from 'react'

export const authContext = createContext()

export default function AuthProvider({ children }) {

    const [token, setToken] = useState(null);
    useEffect(() => {
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    }, [])
    return (
        <>
            <authContext.Provider value={{ token, setToken }}>
                {children}
            </authContext.Provider>
        </>
    )
}
