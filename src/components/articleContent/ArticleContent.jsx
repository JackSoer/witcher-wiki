import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './articleContent.scss';
import getDocById from '../../utils/getDocById';

import Toc from '../toc/Toc';
import Cat from '../cat/Cat';
import Dropdown from '../dropdown/Dropdown';
import Contributor from '../Contributor/Contributor';

const ArticleContent = ({ article }) => {
  const [cats, setCats] = useState([]);
  const [contributors, setContributors] = useState([]);

  function addLineBreaks(text) {
    return text.replace(/ {2}/g, '\n');
  }

  useEffect(() => {
    const fetchCats = async () => {
      const articleCats = await Promise.all(
        article.cats.map((catId) => {
          return getDocById('Categories', catId);
        })
      );

      setCats(articleCats);
    };

    const fetchContributors = async () => {
      const articleContributors = await Promise.all(
        article.contributors.map((contributorsId) => {
          return getDocById('Users', contributorsId);
        })
      );

      setContributors(articleContributors);
    };

    fetchCats();
    fetchContributors();
  }, [article]);

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
        <Dropdown title="Categories">
          {cats.map((cat) => (
            <Cat title={cat.title} key={cat.id} />
          ))}
        </Dropdown>
        <Dropdown title="Contributors">
          {contributors.map((contributor) => (
            <Contributor
              img={contributor.img}
              username={contributor.username}
              key={contributor.id}
            />
          ))}
        </Dropdown>
      </div>
    </div>
  );
};

export default ArticleContent;
