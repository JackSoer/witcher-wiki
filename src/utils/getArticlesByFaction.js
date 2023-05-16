const getArticlesByFaction = (articles, faction) => {
  const articlesByFaction = articles.filter(
    (article) => article.faction === faction
  );

  return articlesByFaction;
};

export default getArticlesByFaction;
