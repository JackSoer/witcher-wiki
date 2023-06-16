const getArticleByTitle = (articles, title) => {
  if (!title) {
    return [];
  }

  const article = articles.find(
    (article) => article.title.toLowerCase() === title.toLowerCase()
  );

  return article;
};

export default getArticleByTitle;
