import React, { useContext, useEffect, useState } from 'react';
import './article.scss';
import { useParams } from 'react-router-dom';
import getArticlesByTitle from '../../utils/getArticlesByTitle';
import ArticleContent from '../../components/articleContent/ArticleContent';
import ArticlesContext from '../../context/ArticlesContext';

import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

const Article = () => {
  const { id } = useParams();

  const { articles } = useContext(ArticlesContext);

  const [article, setArticle] = useState({});
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getArticle = () => {
      try {
        const filteredArticle = getArticlesByTitle(articles, id)[0];

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
