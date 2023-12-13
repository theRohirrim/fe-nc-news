import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setUser] = useState('weegembump')

    return (
    <UserContext.Provider value={{currentUser, setUser}}>
        {children}
    </UserContext.Provider>
    ) 
}