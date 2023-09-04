import { useState } from 'react'
import { useAuthContext } from "./useAuthContext";
// firebase imports
import { auth, db } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = (email, password) => {
        setError(null);
        setIsPending(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                dispatch({ type: 'LOGIN', payload: response.user })
                updateDoc(doc(db, "users", auth.currentUser.uid), {
                    online: true
                });
            })
            .catch((err) => {
                setError(err.message)
            })
            .finally(() => setIsPending(false))
    }

    return { error, login, isPending }
};
