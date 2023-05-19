import { useEffect, useState } from 'react';
import { db } from '../config/firebase.js';
import { getDocs, collection } from 'firebase/firestore';

const useFetchArticlesByCat = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const articlesRef = collection(db, 'Articles');

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);

        const data = await getDocs(articlesRef);
        const filteredArticles = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setArticles(filteredArticles);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, []);

  return { articles, fetchError, isLoading };
};

export default useFetchArticlesByCat;
