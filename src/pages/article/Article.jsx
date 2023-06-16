import React, { useContext, useEffect, useState } from 'react';
import './article.scss';
import { useParams, useLocation } from 'react-router-dom';
import ArticleContent from '../../components/articleContent/ArticleContent';
import ArticlesContext from '../../context/ArticlesContext';

import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import getDocById from '../../utils/getDocById';
import getArticleByTitle from '../../utils/getArticleByTitle';

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
        } else {
          filteredArticle = getArticleByTitle(articles, id);
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
