import React from 'react';
import ReactMarkdown from 'react-markdown';
import './articleContent.scss';

import Toc from '../toc/Toc';

const ArticleContent = ({ article }) => {
  function addLineBreaks(text) {
    return text.replace(/ {2}/g, '\n');
  }

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
      </div>
    </div>
  );
};

export default ArticleContent;
