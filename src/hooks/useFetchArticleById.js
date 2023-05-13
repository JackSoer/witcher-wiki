import { useEffect, useState } from 'react';
import { db } from '../config/firebase.js';
import { doc, getDoc } from 'firebase/firestore';

const useFetchArticleById = (id) => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getArticleById = async (identifier) => {
      try {
        setIsLoading(true);
        const articleDoc = await getDoc(doc(db, 'Articles', identifier));
        const idArticle = { ...articleDoc.data(), id: articleDoc.id };

        setArticle(idArticle);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getArticleById(id);
  }, [id]);

  console.log(article);

  return { article, fetchError, isLoading };
};

export default useFetchArticleById;
