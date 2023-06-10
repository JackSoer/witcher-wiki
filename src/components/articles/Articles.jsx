import React, { useContext, useState, useEffect } from 'react';
import './articles.scss';
import ReactPaginate from 'react-paginate';
import FilterContext from '../../context/FilterContext';

import ArticleCard from '../../components/articleCard/ArticleCard';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

const Articles = ({
  filteredArticles,
  isLoading,
  fetchError,
  suggestedArticles,
}) => {
  const { faction } = useContext(FilterContext);

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 10;
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

  return (
    <>
      {isLoading && !fetchError && <Loading />}
      {fetchError && !isLoading && <Error errorText={fetchError} />}
      <div className="articles">
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
          pageRangeDisplayed={3}
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
