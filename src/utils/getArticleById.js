import { db } from '../config/firebase.js';
import { doc, getDoc } from 'firebase/firestore';

const getArticleById = async (id) => {
  try {
    const articleDoc = await getDoc(doc(db, 'Articles', id));
    const article = { ...articleDoc.data(), id: articleDoc.id };

    return article;
  } catch (err) {
    return err.message;
  }
};

export default getArticleById;
