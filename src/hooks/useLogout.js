import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from 'firebase/firestore';

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch, user } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);
        const {uid} = user;
        await updateDoc(doc(db, 'users', uid), {
            online: false
        })

        signOut(auth)
            .then(() => {
                console.log('user signed out')
                dispatch({ type: 'LOGOUT' })
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() =>
                setIsPending(false)
            )
    }
    return { logout, error, isPending }
}

