import React, { useContext, useEffect, useState } from 'react';
import './myArticles.scss';
import Articles from '../../components/articles/Articles';
import AuthContext from '../../context/AuthContext';
import getDocById from '../../utils/getDocById';

import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

const MyArticles = () => {
  const { currentUser } = useContext(AuthContext);

  const [userArticles, setUserArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchUserArticles = async () => {
      try {
        setIsLoading(true);

        const userArticlesData = await Promise.all(
          currentUser.articles.map((articleId) =>
            getDocById('Articles', articleId)
          )
        );

        setUserArticles(userArticlesData);

        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserArticles();
  }, []);

  return (
    <div className="my-articles">
      <div className="container">
        <h1 className="my-articles__title">My Articles</h1>
        {!isLoading && !fetchError && (
          <Articles filteredArticles={userArticles} />
        )}
        {isLoading && !fetchError && <Loading />}
        {fetchError && !isLoading && <Error errorText={fetchError} />}
      </div>
    </div>
  );
};

export default MyArticles;
