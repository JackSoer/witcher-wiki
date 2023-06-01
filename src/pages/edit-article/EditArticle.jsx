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

import Input from '../../components/input/Input';
import FactionsFilter from '../../components/factionsFilter/FactionsFilter';
import Error from '../../components/error/Error';
import MultSelect from '../../components/multSelect/MultSelect';
import getDocById from '../../utils/getDocById';

const EditArticle = () => {
  const { id } = useParams();

  const { isLoading, fetchError, data } = useFetchDocsFromColl('Categories');
  const articlesData = useFetchDocsFromColl('Articles');

  const { articles, setArticles } = useContext(ArticlesContext);
  const { faction, setFaction } = useContext(FilterContext);
  const { currentUser } = useContext(AuthContext);

  const editedArticle = useRef(getArticlesByTitle(articles, id)[0]);

  const [article, setArticle] = useState(editedArticle.current);
  const [factionEnable, setFactionEnable] = useState(false);
  const [error, setError] = useState('');
  const [defCats, setDefCats] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDefCats = async () => {
      const editedArticlesCats = await Promise.all(
        editedArticle.current.cats.map((cat) => getDocById('Categories', cat))
      );
      const catsTitles = editedArticlesCats.map((cat) => cat.title);

      setDefCats(catsTitles);
    };

    fetchDefCats();
    setFaction(editedArticle.current.faction);
  }, [editedArticle]);

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
        setFaction(editedArticle.current.faction);

        return isFactionEnable;
      } else if (!isFactionEnable) {
        isFactionEnable = false;
        setFaction('');

        return isFactionEnable;
      }
    };

    setFactionEnable(checkIsFactionEnable());
  }, [article.cats]);

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
      console.log(editedArticle.current);
      if (isContributor) {
        await updateDoc(doc(db, 'Articles', editedArticle.current.id), article);
      } else {
        await updateDoc(doc(db, 'Articles', editedArticle.current.id), {
          ...article,
          contributors: [currentUser.id, ...article.contributors],
        });
      }

      const editedArticles = articlesData.data.map((articleData) =>
        articleData.id === editedArticle.current.title ? article : articleData
      );
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
        <form className="edit-article__form" onSubmit={handleEdit}>
          <Input
            id="title"
            value={article.title}
            onChange={(e) => handleInput(e, setArticle)}
            placeholder="Title"
            type="text"
            required
          />
          <Input
            id="mainImage"
            value={article.mainImage}
            onChange={(e) => handleInput(e, setArticle)}
            placeholder="Main Image URL"
            type="text"
            required
          />
          <label htmlFor="cats" className="article-form__label">
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
            <div className="edit-article__factions">
              <p className="edit-article__factions-title">Factions: </p>
              <FactionsFilter />
            </div>
          )}
          <textarea
            name="content"
            id="content"
            className="edit-article__content"
            onChange={(e) => handleInput(e, setArticle)}
            placeholder="Content"
            required
            value={article.content}
          ></textarea>
          <p className="edit-article__content-tip">
            Only markdown, HTML will be ignored
          </p>
          {error && <Error errorText={error} />}
          <button type="submit" className="edit-article__btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
