import React, { useContext, useEffect, useState } from 'react';
import './addArticle.scss';
import useFetchDocsFromColl from '../../hooks/useFetchDocsFromColl';
import handleOptions from '../../utils/handleOptions';
import handleInput from '../../utils/handleInput';
import FilterContext from '../../context/FilterContext';

import Input from '../../components/input/Input';
import FactionsFilter from '../../components/factionsFilter/FactionsFilter';

const AddArticle = () => {
  const { isLoading, fetchError, data } = useFetchDocsFromColl('Categories');
  const { setFaction } = useContext(FilterContext);

  const [article, setArticle] = useState({
    title: '',
    mainImage: '',
    content: '',
    cats: [],
  });
  const [factionEnable, setFactionEnable] = useState(false);

  useEffect(() => {
    let isFactionEnable = false;
    const characterCat = '73Yemo45eAM4ZwQfJ4V7';
    const locationCat = 'P4od8t84gJQwhF9RyPzk';

    article.cats.forEach((cat, index) => {
      if (cat === characterCat || cat === locationCat) {
        isFactionEnable = true;
        return;
      }
    });

    setFactionEnable(isFactionEnable);
  }, [article.cats]);

  useEffect(() => {
    setFaction('');
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
  };

  return (
    <div className="add-article">
      <form className="add-article__form" onSubmit={handleAdd}>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => handleInput(e, setArticle)}
          placeholder="title"
          type="text"
        />
        <Input
          id="mainImage"
          value={data.mainImage}
          onChange={(e) => handleInput(e, setArticle)}
          placeholder="Main Image URL"
          type="text"
        />
        {!isLoading && !fetchError && (
          <select
            name="cats"
            className="add-article__cats"
            multiple
            id="cats"
            onChange={(e) => handleOptions(e, setArticle)}
          >
            {data.map((cat) => (
              <option
                key={cat.id}
                className="add-article__cats-item"
                id={cat.id}
              >
                {cat.title}
              </option>
            ))}
          </select>
        )}
        {factionEnable && <FactionsFilter />}
        <textarea
          name="content"
          id="content"
          className="add-article__content"
          onChange={(e) => handleInput(e, setArticle)}
          placeholder="Content"
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default AddArticle;
