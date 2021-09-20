import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';

export const useDatabase = () => {
    // const [references, setReferences] = useState([]);

    const getReference = (path, setReferenceHolder) => {
        database().ref(path).on('value', snapshot => {
            setReferenceHolder(snapshot.val());
        });
    };

    const deleteReference = (path) => {
        database().ref(path).off();
    }


    return { getReference, deleteReference };
}