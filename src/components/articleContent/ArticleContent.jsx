import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './articleContent.scss';
import getCatById from '../../utils/getCatById';

import Toc from '../toc/Toc';
import Cats from '../cats/Cats';

const ArticleContent = ({ article }) => {
  const [cats, setCats] = useState([]);

  function addLineBreaks(text) {
    return text.replace(/ {2}/g, '\n');
  }

  useEffect(() => {
    const fetchCats = async () => {
      const articleCats = await Promise.all(
        article.cats.map((catId) => {
          return getCatById(catId);
        })
      );

      setCats(articleCats);
    };

    fetchCats();
  }, []);

  return (
    <div className="article-content">
      <div className="container">
        <h1 className="article-content__title">{article.title}</h1>
        <div className="article-content__info">
          <img
            src={article.mainImage}
            alt="Something went wrong"
            className="article-content__img"
          />
          <div className="article-content__toc-box">
            <Toc content={addLineBreaks(article.content)} />
          </div>
        </div>
        <ReactMarkdown skipHtml={true}>
          {addLineBreaks(article.content)}
        </ReactMarkdown>
        <Cats cats={cats} />
      </div>
    </div>
  );
};

export default ArticleContent;
