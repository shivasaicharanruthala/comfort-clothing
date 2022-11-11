import {createContext, useEffect, useState} from "react";

import {createUserDocumentFromAuth, onAuthStateChangeListener} from "../utils/firebase/firbase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}

    useEffect(() => {
        async function listenToAuth() {
            return await onAuthStateChangeListener((user) => {
                if (user) {
                    createUserDocumentFromAuth(user, {});
                }

                setCurrentUser(user);
            });
        }

        listenToAuth();
    }, [])

    return <UserContext.Provider value={value}> {children} </UserContext.Provider>
}