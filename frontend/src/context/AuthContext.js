"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isLoggedin, setisLoggedin ] = useState(false);
    const [token, settoken]= useState(null);
    const [userid, setuserid]= useState(null);

    useEffect(()=>{
        const t = localStorage.getItem("token");
        if (t) {
            settoken(t);
            setisLoggedin(!!t);
            const decoded = jwtDecode(t);
            setuserid(decoded.id);
        }
    },[]);

    const login = (t)=>{
        localStorage.setItem("token", t);
        settoken(t);
        setisLoggedin(true);
        const decoded = jwtDecode(t);
        setuserid(decoded.id);
    }

    const logout = ()=>{
        localStorage.removeItem("token");
        settoken(null);
        setisLoggedin(false);
        setuserid(null);
    };

    return(
        <AuthContext.Provider value={{isLoggedin, login, logout, token, userid}}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be inside AuthProvider");
    return context;
}