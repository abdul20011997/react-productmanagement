import React, { useState } from 'react'
import { createContext } from 'react';
export  const AuthContext=createContext();
export default function AuthContextProvider(props) {
    const [isauth,setAuth]=useState(localStorage.getItem('isauth') ? localStorage.getItem('isauth') :false);
    const handleAuth=()=>{
        setAuth(true)
    }
    const islogout=()=>{
        setAuth(false)
    }
    return (
        <div>
            <AuthContext.Provider value={{isauth:isauth,handleAuth:handleAuth,islogout:islogout}}>
                {props.children}
            </AuthContext.Provider>
        </div>
    )
}
