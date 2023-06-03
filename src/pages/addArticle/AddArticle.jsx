import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addArticle.scss';
import useFetchDocsFromColl from '../../hooks/useFetchDocsFromColl';
import handleInput from '../../utils/handleInput';
import FilterContext from '../../context/FilterContext';
import { addDoc, updateDoc, collection, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ArticlesContext from '../../context/ArticlesContext';
import AuthContext from '../../context/AuthContext';

import Input from '../../components/input/Input';
import FactionsFilter from '../../components/factionsFilter/FactionsFilter';
import Error from '../../components/error/Error';
import MultSelect from '../../components/multSelect/MultSelect';
import Textarea from '../../components/textarea/Textarea';
import isValidateTextarea from '../../utils/isValidateTextarea';

const AddArticle = () => {
  const { isLoading, fetchError, data } = useFetchDocsFromColl('Categories');
  const articlesData = useFetchDocsFromColl('Articles');

  const { faction, setFaction } = useContext(FilterContext);
  const { setArticles } = useContext(ArticlesContext);
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

  const handleAdd = async (e) => {
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

    try {
      const newArticle = await addDoc(collection(db, 'Articles'), article);
      await updateDoc(doc(db, 'Users', currentUser.id), {
        articles: [newArticle.id, ...currentUser.articles],
      });
      article.cats.forEach(async (cat) => {
        await addDoc(collection(db, 'Categories', cat, 'Articles'), {
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

      setArticles([{ ...article, id: newArticle.id }, ...articlesData.data]);
      setError('');

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-article">
      <div className="container">
        <h1 className="add-article__title">Add article</h1>
        <form className="add-article__form" onSubmit={handleAdd}>
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
            pattern="^(https?:\/\/)?\S+\.(png|jpe?g|gif|bmp)(\?.*)?$"
            errorMsg="Invalid image URL. Please provide a valid URL ending with one of the supported image file extensions: .png, .jpg, .jpeg, .gif, .bmp."
          />
          <label htmlFor="cats" className="add-article__label">
            Categories (choose one or more):
          </label>
          {!isLoading && !fetchError && (
            <MultSelect items={data} setFunc={setArticle} id="cats" />
          )}
          {factionEnable && (
            <div className="add-article__factions">
              <p className="add-article__factions-title">Factions: </p>
              <FactionsFilter />
            </div>
          )}
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
      </div>
    </div>
  );
};

export default AddArticle;
