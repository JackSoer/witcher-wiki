import React, { useState, useEffect } from 'react';
import './toc.scss';

const Toc = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const parseHeadings = (content) => {
    const headingElements = Array.from(
      document.querySelectorAll('h2, h3, h4, h5, h6')
    );
    const regex = /#{1,6}\s(.+)/gm;
    const matches = content.match(regex);

    if (matches) {
      const parsedHeadings = matches.map((match, index) => {
        const level = match.indexOf(' ');
        const title = match.substring(level + 1);
        const anchorId = `heading-${index}`;
        headingElements[index].setAttribute('id', anchorId);

        return {
          level,
          title,
          anchorId,
        };
      });

      setHeadings(parsedHeadings);
    }
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
          src={`./public/assets/icons/${isOpen ? 'minus' : 'plus'}.png`}
          alt="Something went wrong"
          className="toc__btn-icon"
        />
        <span className="toc__btn-text">Contents</span>
      </button>
      <ul className={isOpen ? 'toc__list toc__list--active' : 'toc__list'}>
        {headings.map((heading, index) => (
          <li key={heading.anchorId} className="toc__list-item">
            <a href={`#${heading.anchorId}`}>{`${index + 1}. ${
              heading.title
            }`}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toc;
