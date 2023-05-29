import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addArticle.scss';
import useFetchDocsFromColl from '../../hooks/useFetchDocsFromColl';
import handleOptions from '../../utils/handleOptions';
import handleInput from '../../utils/handleInput';
import FilterContext from '../../context/FilterContext';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ArticlesContext from '../../context/ArticlesContext';

import Input from '../../components/input/Input';
import FactionsFilter from '../../components/factionsFilter/FactionsFilter';
import Error from '../../components/error/Error';
import MultSelect from '../../components/multSelect/MultSelect';

const AddArticle = () => {
  const { isLoading, fetchError, data } = useFetchDocsFromColl('Categories');
  const articlesData = useFetchDocsFromColl('Articles');

  const { faction, setFaction } = useContext(FilterContext);
  const { setArticles } = useContext(ArticlesContext);

  const navigate = useNavigate();

  const [article, setArticle] = useState({
    title: '',
    mainImage: '',
    content: '',
    cats: [],
  });
  const [factionEnable, setFactionEnable] = useState(false);
  const [error, setError] = useState('');

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
    }

    try {
      await setDoc(doc(db, 'Articles', article.title), article);

      article.cats.forEach(async (cat) => {
        await setDoc(doc(db, 'Categories', cat, 'Articles', article.title), {
          articleRef: article.title,
        });
      });

      setArticles([{ ...article, id: article.title }, ...articlesData.data]);
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
            value={data.title}
            onChange={(e) => handleInput(e, setArticle)}
            placeholder="Title"
            type="text"
            required
          />
          <Input
            id="mainImage"
            value={data.mainImage}
            onChange={(e) => handleInput(e, setArticle)}
            placeholder="Main Image URL"
            type="text"
            required
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
          <textarea
            name="content"
            id="content"
            className="add-article__content"
            onChange={(e) => handleInput(e, setArticle)}
            placeholder="Content"
            required
          ></textarea>
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
