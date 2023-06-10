import React, { useContext, useEffect, useState } from 'react';
import './article.scss';
import { useParams, useLocation } from 'react-router-dom';
import getArticlesByTitle from '../../utils/getArticlesByTitle';
import ArticleContent from '../../components/articleContent/ArticleContent';
import ArticlesContext from '../../context/ArticlesContext';

import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import getDocById from '../../utils/getDocById';

const Article = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const { articles } = useContext(ArticlesContext);

  const [article, setArticle] = useState({});
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getArticle = async () => {
      try {
        let filteredArticle;
        if (pathname.includes('/suggested-articles')) {
          filteredArticle = await getDocById('Suggested Articles', id);
          console.log(id, filteredArticle);
        } else {
          filteredArticle = getArticlesByTitle(articles, id)[0];
        }
        setArticle(filteredArticle);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      }
    };

    getArticle();
  }, [articles, id]);

  return (
    <div className="article">
      {article && !fetchError && <ArticleContent article={article} />}
      {!fetchError && !article?.title && <Loading />}
      {fetchError && <Error errorText={fetchError} />}
    </div>
  );
};

export default Article;
