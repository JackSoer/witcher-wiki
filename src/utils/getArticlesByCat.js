import { db } from '../config/firebase.js';
import { getDocs, collection } from 'firebase/firestore';
import getArticleById from './getArticleById.js';

const getArticlesByCat = async (categories) => {
  try {
    const catsRef = collection(db, 'Categories');
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
      articlesRefs.map((articlesRef) => {
        return getArticleById(articlesRef.articleRef);
      })
    );

    return catArticles;
  } catch (err) {
    return err.message;
  }
};

export default getArticlesByCat;
