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
      <form className="add-article__form" onSubmit={handleAdd}>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => handleInput(e, setArticle)}
          placeholder="title"
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
        {!isLoading && !fetchError && (
          <select
            name="cats"
            className="add-article__cats"
            multiple
            id="cats"
            onChange={(e) => handleOptions(e, setArticle)}
            required
          >
            {data.map((cat) => (
              <option
                key={cat.id}
                id={cat.id}
                className="add-article__cats-item"
              >
                {cat.title}
              </option>
            ))}
          </select>
        )}
        {factionEnable && <FactionsFilter />}
        <textarea
          name="content"
          id="content"
          className="add-article__content"
          onChange={(e) => handleInput(e, setArticle)}
          placeholder="Content"
          required
        ></textarea>
        <button type="submit">Send</button>
        {error && <Error errorText={error} />}
      </form>
    </div>
  );
};

export default AddArticle;
