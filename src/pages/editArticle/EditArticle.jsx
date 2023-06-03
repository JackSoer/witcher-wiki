import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './editArticle.scss';
import useFetchDocsFromColl from '../../hooks/useFetchDocsFromColl';
import handleInput from '../../utils/handleInput';
import FilterContext from '../../context/FilterContext';
import AuthContext from '../../context/AuthContext';
import ArticlesContext from '../../context/ArticlesContext';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import getArticlesByTitle from '../../utils/getArticlesByTitle';
import isValidateTextarea from '../../utils/isValidateTextarea';

import Input from '../../components/input/Input';
import FactionsFilter from '../../components/factionsFilter/FactionsFilter';
import Error from '../../components/error/Error';
import MultSelect from '../../components/multSelect/MultSelect';
import Textarea from '../../components/textarea/Textarea';
import Loading from '../../components/loading/Loading';
import getDocById from '../../utils/getDocById';

const EditArticle = () => {
  const { id } = useParams();

  const { isLoading, fetchError, data } = useFetchDocsFromColl('Categories');
  const articlesData = useFetchDocsFromColl('Articles');

  const { articles, setArticles } = useContext(ArticlesContext);
  const { faction, setFaction } = useContext(FilterContext);
  const { currentUser, dispatch } = useContext(AuthContext);

  const editedArticle = useRef(getArticlesByTitle(articles, id)[0]);

  const [article, setArticle] = useState(editedArticle.current);
  const [factionEnable, setFactionEnable] = useState(false);
  const [error, setError] = useState('');
  const [defCats, setDefCats] = useState([]);
  const [isValidateContent, setIsValidateContent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    editedArticle.current = getArticlesByTitle(articles, id)[0];
    setArticle(getArticlesByTitle(articles, id)[0]);
  }, [articles]);

  useEffect(() => {
    const fetchDefCats = async () => {
      const editedArticlesCats = await Promise.all(
        editedArticle.current.cats.map((cat) => getDocById('Categories', cat))
      );
      const catsTitles = editedArticlesCats.map((cat) => cat.title);

      setDefCats(catsTitles);
    };

    editedArticle.current?.cats && fetchDefCats();
    setFaction(editedArticle.current?.faction);
  }, [editedArticle.current]);

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

      if (isFactionEnable) {
        setFaction(editedArticle.current.faction);

        return isFactionEnable;
      } else if (!isFactionEnable) {
        isFactionEnable = false;
        setFaction('');

        return isFactionEnable;
      }
    };

    setFactionEnable(checkIsFactionEnable());
  }, [article?.cats]);

  useEffect(() => {
    setArticle((prev) => ({ ...prev, faction }));
  }, [faction]);

  const handleEdit = async (e) => {
    e.preventDefault();

    const isEqual =
      JSON.stringify(editedArticle.current) === JSON.stringify(article);

    if (isEqual) {
      return;
    }

    if (factionEnable && !article.faction) {
      setError('Choose a faction');
      return;
    } else if (article.cats.length < 1) {
      setError('Choose a category');
      return;
    }

    try {
      const isContributor = article.contributors.includes(currentUser.id);
      let editedArticles;

      if (isContributor) {
        await updateDoc(doc(db, 'Articles', editedArticle.current.id), article);

        editedArticles = articlesData.data.map((articleData) =>
          articleData.id === editedArticle.current.id ? article : articleData
        );
      } else {
        await updateDoc(doc(db, 'Articles', editedArticle.current.id), {
          ...article,
          contributors: [...article.contributors, currentUser.id],
        });
        await updateDoc(doc(db, 'Users', currentUser.id), {
          articles: [editedArticle.current.id, ...currentUser.articles],
        });

        editedArticles = articlesData.data.map((articleData) =>
          articleData.id === editedArticle.current.id
            ? {
                ...article,
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

      setArticles(editedArticles);

      setError('');

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="edit-article">
      <div className="container">
        <h1 className="edit-article__title">Edit article</h1>
        {article && article.title && (
          <form className="edit-article__form" onSubmit={handleEdit}>
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
              <MultSelect
                items={data}
                setFunc={setArticle}
                id="cats"
                defValues={defCats}
              />
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
            <p className="edit-article__content-tip">
              Only markdown, HTML will be ignored
            </p>
            {error && <Error errorText={error} />}
            <button type="submit" className="edit-article__btn">
              Send
            </button>
          </form>
        )}
        {!article?.title && <Loading />}
      </div>
    </div>
  );
};

export default EditArticle;
