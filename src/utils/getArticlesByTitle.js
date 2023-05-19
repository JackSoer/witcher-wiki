const getArticlesByTitle = (articles, title) => {
  if (!title) {
    return [];
  }

  const filteredArticles = articles.filter((articles) => {
    return articles.title.toLowerCase().includes(title.toLowerCase());
  });

  return filteredArticles;
};

export default getArticlesByTitle;
