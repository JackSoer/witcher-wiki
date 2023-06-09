import React, { useContext, useState, useEffect } from 'react';
import './articles.scss';
import ReactPaginate from 'react-paginate';
import FilterContext from '../../context/FilterContext';

import ArticleCard from '../../components/articleCard/ArticleCard';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import ArticlesContext from '../../context/ArticlesContext';
import WindowSizeContext from '../../context/WindowSizeContext';

const Articles = ({
  filteredArticles,
  isLoading,
  fetchError,
  suggestedArticles,
}) => {
  const { faction } = useContext(FilterContext);
  const { action } = useContext(ArticlesContext);
  const { windowSize } = useContext(WindowSizeContext);

  const [itemOffset, setItemOffset] = useState(0);

  const handleItemsPerPage = () => {
    if (windowSize.width > 1250) {
      return 15;
    } else if (windowSize.width > 1000) {
      return 16;
    } else if (windowSize.width > 570) {
      return 15;
    } else {
      return 16;
    }
  };

  const itemsPerPage = handleItemsPerPage();
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredArticles.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredArticles.length / itemsPerPage);

  useEffect(() => {
    setItemOffset(0);
  }, [faction]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredArticles.length;
    setItemOffset(newOffset);
  };

  const getClass = () => {
    if (suggestedArticles && action === 'edit') {
      return 'articles articles--suggested';
    } else if (suggestedArticles && action === 'add') {
      return 'articles articles--suggested-add';
    } else {
      return 'articles';
    }
  };

  return (
    <>
      {isLoading && !fetchError && <Loading />}
      {fetchError && !isLoading && <Error errorText={fetchError} />}
      <div className={getClass()}>
        {!isLoading &&
          !fetchError &&
          currentItems.map((article) => (
            <ArticleCard
              title={article.title}
              image={article.mainImage}
              key={article.id}
              suggestedArticle={suggestedArticles}
              article={article}
            />
          ))}
      </div>
      {filteredArticles.length > itemsPerPage && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={windowSize.width <= 425 ? 1 : 2}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="pagination__link"
          previousLinkClassName="pagination__prev"
          nextLinkClassName="pagination__next"
          breakClassName="pagination__link"
          activeClassName="pagination__active"
        />
      )}
    </>
  );
};

export default Articles;
