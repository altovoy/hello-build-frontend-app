const FAVORITE_REPOSITORIES_KEY = "favorite_pokemons";

export const getFavoriteRepos = async () =>
  JSON.parse(localStorage.getItem(FAVORITE_REPOSITORIES_KEY) || "[]");

export const saveFavoriteRepos = async (favoriteRepos) =>
  localStorage.setItem(
    FAVORITE_REPOSITORIES_KEY,
    JSON.stringify(favoriteRepos)
  );

export const saveFavoriteRepository = async (id) => {
  const favoriteRepos = await getFavoriteRepos();
  favoriteRepos.push(id);
  await saveFavoriteRepos(favoriteRepos);
};

export const removeFavoriteRepository = async (id) => {
  let favoriteRepos = await getFavoriteRepos();
  favoriteRepos = favoriteRepos.filter((favoriteRepo) => favoriteRepo !== id);
  await saveFavoriteRepos(favoriteRepos);
};
