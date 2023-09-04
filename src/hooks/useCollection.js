import { useState, useEffect } from 'react'
import { db } from '../firebase/config';
//firebase
import { collection, onSnapshot } from 'firebase/firestore';

export const useCollection = (coll) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ref = collection(db, coll);

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ id: doc.id, ...doc.data() })
            })
            setDocuments(results);
            setError(null)
        }, err => {
            console.log(err)
            setError('could not fetch data')
        })

        return () => unsubscribe(); //cleanup 

    }, [coll]);

    return { documents, error }
};
