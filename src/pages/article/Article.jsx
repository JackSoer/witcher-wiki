import React, { useEffect, useState } from 'react';
import './article.scss';
import { useParams } from 'react-router-dom';
import useFetchArticles from '../../hooks/useFetchArticles';
import getArticlesByTitle from '../../utils/getArticlesByTitle';

import ArticleContent from '../../components/articleContent/ArticleContent';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

const Article = () => {
  const { id } = useParams();
  const { articles, isLoading, fetchError } = useFetchArticles();
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
