import React, { useEffect, useState, useContext } from 'react';
import './article.scss';
import { useParams } from 'react-router-dom';
import getArticlesByTitle from '../../utils/getArticlesByTitle';
import ArticlesContext from '../../context/ArticlesContext';

import ArticleContent from '../../components/articleContent/ArticleContent';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

const Article = () => {
  const { id } = useParams();
  const { articles, isLoading, fetchError } = useContext(ArticlesContext);
  const [article, setArticle] = useState({});

  useEffect(() => {
    const filteredArticle = getArticlesByTitle(articles, id)[0];

    setArticle(filteredArticle);
  }, [articles, id]);

  return (
    <div className="article">
      {article && article.content && <ArticleContent article={article} />}
      {isLoading && !fetchError && <Loading />}
      {!isLoading && fetchError && <Error errorText={fetchError} />}
    </div>
  );
};

export default Article;
