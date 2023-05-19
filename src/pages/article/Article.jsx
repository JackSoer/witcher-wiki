import React, { useEffect, useState } from 'react';
import './article.scss';
import { useParams } from 'react-router-dom';
import useFetchArticles from '../../hooks/useFetchArticles';
import getArticlesByTitle from '../../utils/getArticlesByTitle';

const Article = () => {
  const { id } = useParams();
  const { articles, isLoading, fetchError } = useFetchArticles();
  const [article, setArticle] = useState({});

  useEffect(() => {
    const filteredArticle = getArticlesByTitle(articles, id)[0];

    setArticle(filteredArticle);
  }, [articles]);

  return (
    <div className="article">
      <div className="container">{article.title}</div>
    </div>
  );
};

export default Article;
