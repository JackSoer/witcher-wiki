import { useEffect, useState } from 'react';
import { db } from '../config/firebase.js';
import { getDocs, collection } from 'firebase/firestore';

const useFetchFactions = () => {
  const [factions, setFactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const factionsRef = collection(db, 'Fractions');

  useEffect(() => {
    const getFactions = async () => {
      try {
        setIsLoading(true);

        const data = await getDocs(factionsRef);
        const factions = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setFactions(factions);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getFactions();
  }, []);

  return { factions, fetchError, isLoading };
};

export default useFetchFactions;
