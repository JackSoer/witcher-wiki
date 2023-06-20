import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  addDoc,
  updateDoc,
  collection,
  doc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Link } from 'react-router-dom';
import Error from '../error/Error';
import './articleCard.scss';
import ArticlesContext from '../../context/ArticlesContext';
import useFetchDocsFromColl from '../../hooks/useFetchDocsFromColl';
import getDocById from '../../utils/getDocById';

import Loading from '../../components/loading/Loading';

const ArticleCard = ({ title, image, suggestedArticle, article }) => {
  const articlesData = useFetchDocsFromColl('Articles');

  const { setSuggestedArticles, suggestedArticles, action, setArticles } =
    useContext(ArticlesContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contributor, setContrubutor] = useState({});
  const [editedArticle, setEditedArticle] = useState({});

  const contributorId = useRef(null);

  const fetchContributor = async () => {
    contributorId.current =
      article.contributors[article.contributors.length - 1];

    try {
      setIsLoading(true);

      const contributorData = await getDocById('Users', contributorId.current);
      const articleData = await getDocById('Articles', article.editedArticleId);

      setEditedArticle(articleData);
      setContrubutor(contributorData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContributor();
  }, [article]);

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

  const sendDeleteNotification = async () => {
    const contributorData = await getDocById('Users', contributorId.current);

    const notification = {
      title: `Sorry, but your contribution to "${article.title}" article was rejected...`,
      checked: false,
    };

    await updateDoc(doc(db, 'Users', contributorId.current), {
      notifications: [notification, ...contributorData.notifications],
    });
  };

  const handleReject = () => {
    handleDelete();
    sendDeleteNotification();
  };

  const handleAdd = async () => {
    try {
      const contributorData = await getDocById('Users', contributorId.current);

      const newArticle = await addDoc(collection(db, 'Articles'), article);

      await updateDoc(doc(db, 'Users', contributorId.current), {
        articles: [newArticle.id, ...contributorData.articles],
      });

      article.cats.forEach(async (cat) => {
        await addDoc(collection(db, 'Categories', cat, 'Articles'), {
          articleRef: newArticle.id,
        });
      });

      setArticles([{ ...article, id: newArticle.id }, ...articlesData.data]);

      handleDelete();

      const notification = {
        title: `Thank you very much for your contribution to "${article.title}" article! This has already been accepted and added. You can check it in the "My Articles" tab or `,
        articleTitle: article.title,
        checked: false,
      };

      await updateDoc(doc(db, 'Users', contributorId.current), {
        notifications: [notification, ...contributorData.notifications],
      });

      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async () => {
    try {
      const contributorData = await getDocById('Users', contributorId.current);

      await updateDoc(doc(db, 'Articles', article.editedArticleId), {
        ...article,
        id: article.editedArticleId,
      });

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
          if (articleRef.articleRef === article.editedArticleId) {
            articleFinded = true;
          }
        });

        if (!articleFinded) {
          await addDoc(collection(db, 'Categories', cat, 'Articles'), {
            articleRef: article.editedArticleId,
          });
        }
      });

      article.deletedCats.forEach(async (cat) => {
        const data = await getDocs(
          collection(db, 'Categories', cat, 'Articles')
        );
        const articlesRef = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const currentArticlesRef = articlesRef.filter(
          (articleRef) => articleRef.articleRef === editedArticle.id
        );

        currentArticlesRef.forEach(async (currentArticleRef) => {
          await deleteDoc(
            doc(db, 'Categories', cat, 'Articles', currentArticleRef.id)
          );
        });
      });

      const isContributor = contributor.articles.includes(
        article.editedArticleId
      );

      if (!isContributor) {
        await updateDoc(doc(db, 'Users', contributorId.current), {
          articles: [article.editedArticleId, ...contributorData.articles],
        });
      }

      const editedArticles = articlesData.data.map((articleData) =>
        articleData.id === article.editedArticleId
          ? { ...article, id: article.editedArticleId }
          : articleData
      );

      setArticles(editedArticles);

      handleDelete();

      const notification = {
        title: `Thank you very much for your contribution to "${article.title}" article! This has already been accepted and edited. You can check it in the "My Articles" tab or `,
        articleTitle: article.title,
        checked: false,
      };

      await updateDoc(doc(db, 'Users', contributorId.current), {
        notifications: [notification, ...contributorData.notifications],
      });

      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {(!isLoading || !suggestedArticle) && (
        <div
          className={
            suggestedArticle
              ? `article-card-box`
              : `article-card-box article-card-box--suggested `
          }
        >
          {suggestedArticle && action === 'edit' && (
            <>
              <Link to={`/${editedArticle.title}`}>
                <div className="article-card">
                  <img
                    src={editedArticle.mainImage}
                    alt="Something went wrong"
                    className="article-card__img"
                  />
                  <h3 className="article-card__title">{editedArticle.title}</h3>
                  {error && <Error errorText={error} />}
                </div>
              </Link>
              <div className="article-card__arrow">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="article-card__arrow"
                >
                  <polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707" />
                </svg>
              </div>
            </>
          )}
          <div
            className={
              suggestedArticle
                ? `article-card__article-box`
                : `article-card__article-box article-card__article-box--suggested `
            }
          >
            <Link
              to={
                suggestedArticle
                  ? `/suggested-articles/${article.id}`
                  : `/${title}`
              }
            >
              <div className="article-card">
                {error && (
                  <Error errorText={'error'} className="article-card__error" />
                )}
                <img
                  src={image}
                  alt="Something went wrong"
                  className="article-card__img"
                />
                <h3 className="article-card__title">{title}</h3>
              </div>
            </Link>
            {suggestedArticle && (
              <div className="article-card__btns">
                <div className="article-card__btn-box">
                  <button
                    className="article-card__btn"
                    onClick={action === 'add' ? handleAdd : handleEdit}
                  >
                    <svg
                      version="1.1"
                      id="Layer_1"
                      x="0px"
                      y="0px"
                      width="122.877px"
                      height="101.052px"
                      viewBox="0 0 122.877 101.052"
                    >
                      <g>
                        <path d="M4.43,63.63c-2.869-2.755-4.352-6.42-4.427-10.11c-0.074-3.689,1.261-7.412,4.015-10.281 c2.752-2.867,6.417-4.351,10.106-4.425c3.691-0.076,7.412,1.255,10.283,4.012l24.787,23.851L98.543,3.989l1.768,1.349l-1.77-1.355 c0.141-0.183,0.301-0.339,0.479-0.466c2.936-2.543,6.621-3.691,10.223-3.495V0.018l0.176,0.016c3.623,0.24,7.162,1.85,9.775,4.766 c2.658,2.965,3.863,6.731,3.662,10.412h0.004l-0.016,0.176c-0.236,3.558-1.791,7.035-4.609,9.632l-59.224,72.09l0.004,0.004 c-0.111,0.141-0.236,0.262-0.372,0.368c-2.773,2.435-6.275,3.629-9.757,3.569c-3.511-0.061-7.015-1.396-9.741-4.016L4.43,63.63 L4.43,63.63z" />
                      </g>
                    </svg>
                  </button>
                  <div className="article-card__btn-box-tooltip">Approve</div>
                </div>
                <div className="article-card__btn-box">
                  <button className="article-card__btn" onClick={handleReject}>
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      viewBox="0 0 110.61 122.88"
                    >
                      <path d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z" />
                    </svg>
                  </button>
                  <div className="article-card__btn-box-tooltip">Reject</div>
                </div>
              </div>
            )}
          </div>
          {suggestedArticle && (
            <div className="article-card__extra-info">
              <h3 className="article-card__extra-info-title">User</h3>
              <img
                className="article-card__extra-info-img"
                src={contributor.img || '../assets/images/default-avatar.webp'}
              />
              <p className="article-card__extra-info-nickname">
                {contributor.username}
              </p>
              <h3 className="article-card__extra-info-title">Date</h3>
              <p className="article-card__extra-info-date">
                {new Date().toLocaleString(article.timestamp.seconds)}
              </p>
            </div>
          )}
        </div>
      )}
      {suggestedArticle && isLoading && <Loading />}
    </>
  );
};

export default ArticleCard;
