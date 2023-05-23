import { useEffect, useState } from 'react';
import { db } from '../config/firebase.js';
import { getDocs, collection } from 'firebase/firestore';

const useFetchDocsFromColl = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const collRef = collection(db, collectionName);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);

        const data = await getDocs(collRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setData(filteredData);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return { data, fetchError, isLoading };
};

export default useFetchDocsFromColl;
