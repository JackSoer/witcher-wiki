import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './editArticle.scss';
import useFetchDocsFromColl from '../../hooks/useFetchDocsFromColl';
import handleInput from '../../utils/handleInput';
import FilterContext from '../../context/FilterContext';
import AuthContext from '../../context/AuthContext';
import ArticlesContext from '../../context/ArticlesContext';
import {
  updateDoc,
  addDoc,
  doc,
  collection,
  serverTimestamp,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import isValidateTextarea from '../../utils/isValidateTextarea';

import Input from '../../components/input/Input';
import FactionsFilter from '../../components/factionsFilter/FactionsFilter';
import Error from '../../components/error/Error';
import MultSelect from '../../components/multSelect/MultSelect';
import Textarea from '../../components/textarea/Textarea';
import getDocById from '../../utils/getDocById';
import Modal from '../../components/modal/Modal';
import Loading from '../../components/loading/Loading';
import getArticleByTitle from '../../utils/getArticleByTitle';

const EditArticle = () => {
  const { id } = useParams();

  const { isLoading, fetchError, data } = useFetchDocsFromColl('Categories');
  const articlesData = useFetchDocsFromColl('Articles');

  const { articles, setArticles, setSuggestedArticles, suggestedArticles } =
    useContext(ArticlesContext);
  const { faction, setFaction } = useContext(FilterContext);
  const { currentUser, dispatch } = useContext(AuthContext);

  const editedArticle = useRef(getArticleByTitle(articles, id));
  const loaded = useRef(false);

  const [article, setArticle] = useState(editedArticle.current);
  const [factionEnable, setFactionEnable] = useState(true);
  const [error, setError] = useState('');
  const [defCats, setDefCats] = useState([]);
  const [isValidateContent, setIsValidateContent] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [articleTitle, setArticleTitle] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    editedArticle.current = getArticleByTitle(articles, id);
    setArticle(getArticleByTitle(articles, id));

    const fetchDefCats = async () => {
      const editedArticlesCats = await Promise.all(
        editedArticle.current.cats.map((cat) => getDocById('Categories', cat))
      );
      const catsTitles = editedArticlesCats.map((cat) => cat.title);

      setDefCats(catsTitles);
    };

    editedArticle.current?.cats && fetchDefCats();
  }, [articles]);

  useEffect(() => {
    const checkIsFactionEnable = () => {
      let isFactionEnable;
      const characterCat = '73Yemo45eAM4ZwQfJ4V7';
      const locationCat = 'P4od8t84gJQwhF9RyPzk';

      article?.cats?.forEach((cat) => {
        if (cat === characterCat || cat === locationCat) {
          isFactionEnable = true;

          return;
        }
      });

      if (!isFactionEnable) {
        isFactionEnable = false;
        setFaction('');
        loaded.current = true;
      }

      return isFactionEnable;
    };

    setFactionEnable(checkIsFactionEnable());
  }, [article?.cats]);

  useEffect(() => {
    setFaction(editedArticle.current?.faction);
  }, [loaded.current]);

  useEffect(() => {
    setArticle((prev) => ({ ...prev, faction }));
  }, [faction]);

  const handleEditForUser = async () => {
    try {
      const isContributor = article.contributors.includes(currentUser.id);

      let deletedCats = [...editedArticle.current.cats];

      for (let i = 0; i < editedArticle.current.cats.length; i++) {
        for (let j = 0; j < article.cats.length; j++) {
          if (editedArticle.current.cats[i] === article.cats[j]) {
            deletedCats = deletedCats.filter(
              (cat) => cat !== editedArticle.current.cats[i]
            );
          }
        }
      }

      if (isContributor) {
        await addDoc(collection(db, 'Suggested Articles'), {
          editedArticleId: editedArticle.current.id,
          ...article,
          timestamp: serverTimestamp(),
          action: 'edit',
          deletedCats: deletedCats,
        });

        setSuggestedArticles([
          {
            editedArticleId: editedArticle.current.id,
            ...article,
            timestamp: serverTimestamp(),
            action: 'edit',
            deletedCats: deletedCats,
          },
          ...suggestedArticles,
        ]);
      } else {
        await addDoc(collection(db, 'Suggested Articles'), {
          editedArticleId: editedArticle.current.id,
          ...article,
          action: 'edit',
          timestamp: serverTimestamp(),
          contributors: [...article.contributors, currentUser.id],
          deletedCats: deletedCats,
        });

        setSuggestedArticles([
          {
            editedArticleId: editedArticle.current.id,
            ...article,
            action: 'edit',
            timestamp: serverTimestamp(),
            contributors: [...article.contributors, currentUser.id],
            deletedCats: deletedCats,
          },
          ...suggestedArticles,
        ]);
      }

      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditForAdmin = async () => {
    try {
      const isContributor = article.contributors.includes(currentUser.id);
      let editedArticles;

      if (isContributor) {
        await updateDoc(doc(db, 'Articles', editedArticle.current.id), {
          ...article,
          timestamp: serverTimestamp(),
        });

        editedArticles = articlesData.data.map((articleData) =>
          articleData.id === editedArticle.current.id ? article : articleData
        );
      } else {
        await updateDoc(doc(db, 'Articles', editedArticle.current.id), {
          ...article,
          timestamp: serverTimestamp(),
          contributors: [...article.contributors, currentUser.id],
        });
        await updateDoc(doc(db, 'Users', currentUser.id), {
          articles: [editedArticle.current.id, ...currentUser.articles],
        });

        editedArticles = articlesData.data.map((articleData) =>
          articleData.id === editedArticle.current.id
            ? {
                ...article,
                timestamp: serverTimestamp(),
                contributors: [...article.contributors, currentUser.id],
              }
            : articleData
        );

        dispatch({
          type: 'LOGIN',
          payload: {
            ...currentUser,
            articles: [editedArticle.current.id, ...currentUser.articles],
          },
        });
      }

      article.cats.forEach(async (cat) => {
        const data = await getDocs(
          collection(db, 'Categories', cat, 'Articles')
        );
        const articlesRef = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        let articleFinded = false;

        articlesRef.forEach((articleRef) => {
          if (articleRef.articleRef === editedArticle.current.id) {
            articleFinded = true;
          }
        });

        if (!articleFinded) {
          await addDoc(collection(db, 'Categories', cat, 'Articles'), {
            articleRef: editedArticle.current.id,
          });
        }
      });

      let deletedCats = [...editedArticle.current.cats];

      for (let i = 0; i < editedArticle.current.cats.length; i++) {
        for (let j = 0; j < article.cats.length; j++) {
          if (editedArticle.current.cats[i] === article.cats[j]) {
            deletedCats = deletedCats.filter(
              (cat) => cat !== editedArticle.current.cats[i]
            );
          }
        }
      }

      deletedCats.forEach(async (cat) => {
        const data = await getDocs(
          collection(db, 'Categories', cat, 'Articles')
        );
        const articlesRef = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const currentArticlesRef = articlesRef.filter(
          (articleRef) => articleRef.articleRef === editedArticle.current.id
        );

        currentArticlesRef.forEach(async (currentArticleRef) => {
          await deleteDoc(
            doc(db, 'Categories', cat, 'Articles', currentArticleRef.id)
          );
        });
      });

      setArticles(editedArticles);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async (isAdmin, e) => {
    e.preventDefault();

    const isEqual =
      JSON.stringify(editedArticle.current) === JSON.stringify(article);

    if (isEqual) {
      return;
    }

    const isExistingArticle = articlesData.data.find(
      (articleData) =>
        articleData.title.toLowerCase() === article.title.toLowerCase()
    );

    if (isExistingArticle) {
      setError('An article with this title already exists');
      return;
    } else if (factionEnable && !article.faction) {
      setError('Choose a faction');
      return;
    } else if (article.cats.length < 1) {
      setError('Choose a category');
      return;
    } else if (!isValidateContent) {
      return;
    }

    setArticleTitle(article.title);

    if (isAdmin) {
      handleEditForAdmin();
    } else {
      handleEditForUser();
    }

    setModalIsOpen(true);
  };

  const toHomePage = () => {
    navigate('/');
  };

  return (
    <div className="edit-article">
      <div className="container">
        <h1 className="edit-article__title">Edit article</h1>
        {article && article.title && articlesData.data.length > 0 ? (
          <form
            className="edit-article__form"
            onSubmit={(e) => handleEdit(currentUser.isAdmin, e)}
          >
            <Input
              id="title"
              value={article.title}
              onChange={(e) => handleInput(e, setArticle)}
              placeholder="Title"
              type="text"
              required
              pattern="^(?=.*[a-zA-Z].*[a-zA-Z]).+$"
              errorMsg="Title must contain at least 2 letters"
            />
            <Input
              id="mainImage"
              value={article.mainImage}
              onChange={(e) => handleInput(e, setArticle)}
              placeholder="Main Image URL"
              type="text"
              required
              pattern="^https?:\/\/\S+$"
              errorMsg="Invalid image URL. Please provide a valid URL."
            />
            <label htmlFor="cats" className="add-article__label">
              Categories (choose one or more):
            </label>
            {!isLoading && !fetchError && (
              <MultSelect
                items={data}
                setFunc={setArticle}
                id="cats"
                defValues={defCats}
              />
            )}
            {factionEnable && <FactionsFilter />}
            <Textarea
              name="content"
              id="content"
              className="add-article__content"
              onChange={(e) => {
                setIsValidateContent(isValidateTextarea(e.target.value));
                handleInput(e, setArticle);
              }}
              placeholder="Content"
              required
              errorMsg="The article content must be between 10 and 5000 characters long."
              isValidate={isValidateContent}
              value={article.content}
            />
            <p className="edit-article__content-tip">
              Only markdown, HTML will be ignored
            </p>
            {error && <Error errorText={error} />}
            <button type="submit" className="edit-article__btn">
              Send
            </button>
          </form>
        ) : (
          <Loading />
        )}
      </div>
      {modalIsOpen && (
        <Modal>
          {currentUser.isAdmin ? (
            <p>
              Thank you very much for your contribution! This has already been
              accepted and added. You can check it in the "My Articles" tab or
              <Link to={`/${articleTitle}`}>here</Link>.
            </p>
          ) : (
            <p>
              Thank you very much for your contribution! When your contribution
              will be approved or rejected you'll receive a notification about
              this.
            </p>
          )}
          <button onClick={toHomePage}>Home Page</button>
        </Modal>
      )}
    </div>
  );
};

export default EditArticle;
