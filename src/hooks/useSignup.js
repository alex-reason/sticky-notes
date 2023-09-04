import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
// firebase imports
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const useSignUp = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const defaultUrl = 'https://firebasestorage.googleapis.com/v0/b/finance-tracker-68266.appspot.com/o/thumbnails%2Favatar.png?alt=media&token=b1e05ae1-e36a-4b41-ae3f-4f7cbd737976'
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            if (!response) {
                throw new Error('Could not complete')
            }
            // add display name and default photoUrl
            await updateProfile(auth.currentUser, { displayName: displayName, photoURL: 'https://firebasestorage.googleapis.com/v0/b/finance-tracker-68266.appspot.com/o/thumbnails%2Favatar.png?alt=media&token=b1e05ae1-e36a-4b41-ae3f-4f7cbd737976'})

            // create user document
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                online: true,
                displayName,
                avatar: defaultUrl
            });

            //dispatch
            dispatch({ type: 'LOGIN', payload: response.user })
            setError(null);
        } catch (err) {
            setError(err.message)
        } finally {
            setIsPending(false)
        }

    }
    return { error, signup, isPending }
}