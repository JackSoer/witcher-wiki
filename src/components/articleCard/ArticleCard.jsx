import React, { useContext, useEffect, useState } from 'react';
import {
  addDoc,
  updateDoc,
  collection,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Link, useLocation } from 'react-router-dom';
import Error from '../error/Error';
import './articleCard.scss';
import ArticlesContext from '../../context/ArticlesContext';
import useFetchDocsFromColl from '../../hooks/useFetchDocsFromColl';
import getDocById from '../../utils/getDocById';

const ArticleCard = ({ title, image, suggestedArticle, article }) => {
  const articlesData = useFetchDocsFromColl('Articles');
  const { pathname } = useLocation();
  const isSuggestedArticle = pathname.includes('/suggested-articles');
  const { setSuggestedArticles, suggestedArticles, action, setArticles } =
    useContext(ArticlesContext);

  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'Suggested Articles', article.id));
      const filteredArticles = suggestedArticles.filter(
        (suggestedArticle) => suggestedArticle.id !== article.id
      );
      setSuggestedArticles(filteredArticles);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAdd = async () => {
    try {
      const newArticle = await addDoc(collection(db, 'Articles'), article);

      const contributorId =
        article.contributors[article.contributors.length - 1];
      const contributor = await getDocById('Users', contributorId);

      await updateDoc(doc(db, 'Users', contributorId), {
        articles: [newArticle.id, ...contributor.articles],
      });

      article.cats.forEach(async (cat) => {
        await addDoc(collection(db, 'Categories', cat, 'Articles'), {
          articleRef: newArticle.id,
        });
      });

      setArticles([{ ...article, id: newArticle.id }, ...articlesData.data]);

      handleDelete();

      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async () => {
    try {
      await updateDoc(doc(db, 'Articles', article.editedArticleId), article);

      const contributorId =
        article.contributors[article.contributors.length - 1];
      const contributor = await getDocById('Users', contributorId);
      const isContributor = contributor.articles.includes(
        article.editedArticleId
      );

      if (!isContributor) {
        await updateDoc(doc(db, 'Users', contributorId), {
          articles: [article.editedArticleId, ...contributor.articles],
        });
      }

      const editedArticles = articlesData.data.map((articleData) =>
        articleData.id === article.editedArticleId ? article : articleData
      );

      setArticles(editedArticles);

      handleDelete();

      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="article-card-box">
      <Link
        to={
          suggestedArticle ? `/suggested-articles/${article.id}` : `/${title}`
        }
      >
        <div className="article-card">
          <img
            src={image}
            alt="Something went wrong"
            className="article-card__img"
          />
          <h3 className="article-card__title">{title}</h3>
          {error && <Error errorText={error} />}
        </div>
      </Link>
      {isSuggestedArticle && (
        <div className="article-card__btns">
          <button
            className="article-card__btn"
            onClick={action === 'add' ? handleAdd : handleEdit}
          >
            +
          </button>
          <button className="article-card__btn" onClick={handleDelete}>
            -
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
