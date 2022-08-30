import axios from "axios";

const baseUri = process.env.REACT_APP_MAIN_API_URI;

const userUri = `${baseUri}/user`;

export const toggleFavoriteRepository = (userName, favoriteId) =>
  axios.post(`${userUri}/toggle_favorite_repo`, {
    userName,
    favoriteId,
  });
