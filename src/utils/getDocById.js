import { db } from '../config/firebase.js';
import { doc, getDoc } from 'firebase/firestore';

const getDocById = async (collection, id) => {
  try {
    const docById = await getDoc(doc(db, collection, id));
    const docData = { ...docById.data(), id: docById.id };

    return docData;
  } catch (err) {
    return err.message;
  }
};

export default getDocById;
