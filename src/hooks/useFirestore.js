import { useReducer } from 'react'
import { db } from '../firebase/config';
import { firestoreReducer } from '../context/FirestoreReducer';
import { collection, addDoc, deleteDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
};

export const useFirestore = (coll) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);

    const ref = collection(db, coll);

    // add a document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' });
        try {
            const createdAt = serverTimestamp()
            const addedDoc = await addDoc(ref, { ...doc, createdAt });
            dispatch({ type: 'ADDED_DOCUMENT', payload: addedDoc });
        }

        catch (err) {
            dispatch({ type: 'UPDATE_ERROR', payload: err.message })
        }
    }

    // update document
    const updateDocument = async (userId, docToPost) => {
        dispatch({ type: 'IS_PENDING' });
      
        if (userId) {
            const profileRef = doc(db, coll, userId);
            try {
                const updatedDocument = await updateDoc(profileRef, docToPost)
                dispatch({ type: 'UPDATED_DOCUMENT', payload: updatedDocument });
                return updatedDocument
            }
            catch (err) {
                dispatch({ type: 'UPDATE_ERROR', payload: err.message })
            }
        }
    };

    // delete a document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' });
        try {
            await deleteDoc(doc(db, coll, id));
            dispatch({ type: 'DELETED_DOCUMENT' })
        }

        catch (err) {
            dispatch({ type: 'UPDATE_ERROR', payload: err.message })
        }
    }

    return { response, addDocument, deleteDocument, updateDocument }

}