import { useEffect, useState } from 'react';
import getArticleById from '../utils/getArticleById';
import { db } from '../config/firebase.js';
import { getDocs, collection } from 'firebase/firestore';

const useFetchArticlesByCat = (cat) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const catsRef = collection(db, 'Categories');

  useEffect(() => {
    const getArticlesByCat = async (categories) => {
      try {
        setIsLoading(true);

        const data = await getDocs(catsRef);
        const cats = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const chosenCat = cats.find((cat) => cat.title === categories);
        const catArticlesRef = collection(
          db,
          'Categories',
          chosenCat.id,
          'Articles'
        );
        const articlesDocs = await getDocs(catArticlesRef);
        const articlesRefs = articlesDocs.docs.map((doc) => ({
          ...doc.data(),
        }));
        const catArticles = await Promise.all(
          articlesRefs.map((articlesRef) =>
            getArticleById(articlesRef.articleRef)
          )
        );

        setArticles(catArticles);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getArticlesByCat(cat);
  }, [cat]);

  return { articles, fetchError, isLoading };
};

export default useFetchArticlesByCat;
