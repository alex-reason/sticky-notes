import { createContext, useReducer, useEffect } from 'react';
import { authReducer } from './AuthReducer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false // this is to tell react not to or to show components depending if user is logged in or not
    })

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            dispatch({ type: 'AUTH_IS_READY', payload: user })
        });
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}