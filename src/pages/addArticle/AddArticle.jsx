import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './addArticle.scss';
import useFetchDocsFromColl from '../../hooks/useFetchDocsFromColl';
import handleInput from '../../utils/handleInput';
import FilterContext from '../../context/FilterContext';
import {
  addDoc,
  updateDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import ArticlesContext from '../../context/ArticlesContext';
import AuthContext from '../../context/AuthContext';
import isValidateTextarea from '../../utils/isValidateTextarea';

import Input from '../../components/input/Input';
import FactionsFilter from '../../components/factionsFilter/FactionsFilter';
import Error from '../../components/error/Error';
import MultSelect from '../../components/multSelect/MultSelect';
import Textarea from '../../components/textarea/Textarea';
import Loading from '../../components/loading/Loading';
import Modal from '../../components/modal/Modal';

const AddArticle = () => {
  const { isLoading, fetchError, data } = useFetchDocsFromColl('Categories');
  const articlesData = useFetchDocsFromColl('Articles');

  const { faction, setFaction } = useContext(FilterContext);
  const { setArticles, suggestedArticles, setSuggestedArticles } =
    useContext(ArticlesContext);
  const { currentUser, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const [article, setArticle] = useState({
    title: '',
    mainImage: '',
    content: '',
    cats: [],
    faction: '',
    contributors: [currentUser.id],
  });
  const [factionEnable, setFactionEnable] = useState(false);
  const [error, setError] = useState('');
  const [isValidateContent, setIsValidateContent] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [articleTitle, setArticleTitle] = useState('');

  useEffect(() => {
    const checkIsFactionEnable = () => {
      let isFactionEnable;
      const characterCat = '73Yemo45eAM4ZwQfJ4V7';
      const locationCat = 'P4od8t84gJQwhF9RyPzk';

      article.cats.forEach((cat) => {
        if (cat === characterCat || cat === locationCat) {
          isFactionEnable = true;

          return;
        }
      });

      if (isFactionEnable) {
        return isFactionEnable;
      }

      setFaction('');
      isFactionEnable = false;

      return isFactionEnable;
    };

    setFactionEnable(checkIsFactionEnable());
  }, [article.cats]);

  useEffect(() => {
    setArticle((prev) => ({ ...prev, faction }));
  }, [faction]);

  const handleAddForUser = async () => {
    try {
      await addDoc(collection(db, 'Suggested Articles'), {
        action: 'add',
        ...article,
        timestamp: serverTimestamp(),
        currentContributor: currentUser.id,
      });

      setSuggestedArticles([
        {
          action: 'add',
          ...article,
          timestamp: serverTimestamp(),
          currentContributor: currentUser.id,
        },
        ...suggestedArticles,
      ]);

      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddForAdmin = async () => {
    try {
      const newArticle = await addDoc(collection(db, 'Articles'), {
        ...article,
        timestamp: serverTimestamp(),
      });

      await updateDoc(doc(db, 'Users', currentUser.id), {
        articles: [newArticle.id, ...currentUser.articles],
      });

      article.cats.forEach(async (cat) => {
        await setDoc(doc(db, 'Categories', cat, 'Articles', newArticle.id), {
          articleRef: newArticle.id,
        });
      });

      dispatch({
        type: 'LOGIN',
        payload: {
          ...currentUser,
          articles: [newArticle.id, ...currentUser.articles],
        },
      });

      setArticles([
        { ...article, timestamp: serverTimestamp(), id: newArticle.id },
        ...articlesData.data,
      ]);

      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAdd = async (isAdmin, e) => {
    e.preventDefault();

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
      handleAddForAdmin();
    } else {
      handleAddForUser();
    }

    setModalIsOpen(true);
  };

  const toHomePage = () => {
    navigate('/');
  };

  return (
    <div className="add-article">
      <div className="container">
        <h1 className="add-article__title">Add article</h1>
        {articlesData.data.length > 0 ? (
          <form
            className="add-article__form"
            onSubmit={(e) => handleAdd(currentUser.isAdmin, e)}
          >
            <Input
              id="title"
              value={article.title}
              onChange={(e) => handleInput(e, setArticle)}
              placeholder="Title"
              type="text"
              required
              pattern="[A-Za-z]{2,}.*$"
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
            <p htmlFor="cats" className="add-article__label">
              Categories (choose one or more):
            </p>
            {!isLoading && !fetchError && (
              <MultSelect items={data} setFunc={setArticle} id="cats" />
            )}
            {isLoading && !fetchError && <Loading />}
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
            <p className="add-article__content-tip">
              Only markdown, HTML will be ignored
            </p>
            {error && <Error errorText={error} />}
            <button type="submit" className="add-article__btn">
              Send
            </button>
          </form>
        ) : (
          <Loading />
        )}
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
                Thank you very much for your contribution! When your
                contribution will be approved or rejected you'll receive a
                notification about this.
              </p>
            )}
            <button onClick={toHomePage}>Home Page</button>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AddArticle;
