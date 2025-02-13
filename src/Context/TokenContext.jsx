import { createContext, useEffect, useState } from "react";

export const tokenContext = createContext();

import React from 'react'

const TokenContext = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("Token"));
    // useEffect(() => {
    //     if (localStorage.getItem("Token") !== null) {
    //         setToken(localStorage.getItem("Token"));
    //     }
    // }, []);
    return (
        <tokenContext.Provider value={{ token, setToken }}>
            {children}
        </tokenContext.Provider>
    )
}

export default TokenContext