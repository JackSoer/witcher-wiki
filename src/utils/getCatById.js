import { db } from '../config/firebase.js';
import { doc, getDoc } from 'firebase/firestore';

const getCatById = async (id) => {
  try {
    const catDoc = await getDoc(doc(db, 'Categories', id));
    const cat = { ...catDoc.data(), id: catDoc.id };

    return cat;
  } catch (err) {
    return err.message;
  }
};

export default getCatById;
