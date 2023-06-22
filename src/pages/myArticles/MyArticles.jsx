import React, { useContext, useEffect, useState } from 'react';
import './myArticles.scss';
import Articles from '../../components/articles/Articles';
import AuthContext from '../../context/AuthContext';
import getDocById from '../../utils/getDocById';

const MyArticles = () => {
  const { currentUser } = useContext(AuthContext);

  const [userArticles, setUserArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchUserArticles = async () => {
      try {
        setIsLoading(true);

        const contributorData = await getDocById('Users', currentUser.id);

        const userArticlesData = await Promise.all(
          contributorData.articles.map((articleId) =>
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
        <Articles
          filteredArticles={userArticles}
          isLoading={isLoading}
          fetchError={fetchError}
        />
        {userArticles.length <= 0 && !isLoading && !fetchError && (
          <p className="my-articles__warning">You don't have articles...</p>
        )}
      </div>
    </div>
  );
};

export default MyArticles;
