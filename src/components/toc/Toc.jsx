import React, { useState, useEffect } from 'react';
import './toc.scss';

const Toc = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const parseHeadings = (content) => {
    const headingElements = Array.from(
      document.querySelectorAll('h2, h3, h4, h5, h6')
    );

    const regex = /(#{1,6})\s(.+)|^(.+)\n([=-]+)$/gm;
    const matches = content.matchAll(regex);

    const parsedHeadings = [];

    for (const match of matches) {
      const level = match[1]
        ? match[1].length
        : match[4].startsWith('=')
        ? 1
        : 2;
      const title = match[2] || match[3].trim();
      const anchorId = `heading-${parsedHeadings.length}`;
      headingElements[parsedHeadings.length].setAttribute('id', anchorId);

      parsedHeadings.push({
        level: level,
        title: title,
        anchorId: anchorId,
      });
    }

    setHeadings(parsedHeadings);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    parseHeadings(content);
  }, [content]);

  return (
    <div className="toc">
      <button className="toc__btn" onClick={handleClick}>
        <img
          src={`../public/assets/icons/${isOpen ? 'minus' : 'plus'}.png`}
          alt="Something went wrong"
          className="toc__btn-icon"
        />
        <span className="toc__btn-text">Contents</span>
      </button>
      <ol className={isOpen ? 'toc__list toc__list--active' : 'toc__list'}>
        {headings.map((heading, index) => (
          <li key={heading.anchorId} className="toc__list-item">
            <a href={`#${heading.anchorId}`}>{`${index + 1}. ${
              heading.title
            }`}</a>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Toc;
