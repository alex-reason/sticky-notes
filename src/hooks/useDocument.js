import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from 'firebase/firestore';

export const useDocuments = (coll, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsub = onSnapshot(
            doc(db, coll, id),
            (doc) => {
                if (doc.data()){
                    setDocument({ ...doc.data(), id: doc.id });
                    setError(null);
                }
                else {
                    setError('no data for that ID exists')
                }
            },
            (err) => {
                console.log(err.message);
                setError('failed to get document')
            })

        return () => unsub();
    }, [coll, id])

    return { document, error }
};