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
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchArticle = () => {
      try {
        setIsLoading(true);

        const filteredArticle = getArticlesByTitle(articles, id)[0];

        setArticle(filteredArticle);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articles, id]);

  return (
    <div className="article">
      {article && !isLoading && !fetchError && (
        <ArticleContent article={article} />
      )}
      {isLoading && !fetchError && <Loading />}
      {!isLoading && fetchError && <Error errorText={fetchError} />}
    </div>
  );
};

export default Article;
