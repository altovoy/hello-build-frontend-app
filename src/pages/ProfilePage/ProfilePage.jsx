import "./ProfilePage.scss";
import React, { useMemo, useState, useEffect } from "react";

import {
  Backdrop,
  Grid,
  CircularProgress,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { fetchGithubRepositoriesRest } from "../../api/github.api";

import { RepositoryCard } from "../../components/collections/RepositoryCard";
import { logout } from "../../api/auth.api";
import useLocalStorage from "./../../hooks/useLocalStorage";
import { toggleFavoriteRepository } from "./../../api/favorites.api";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [_user, setUser] = useLocalStorage("user");
  const { favoriteRepositories } = _user || {};
  const [_gihubRepositories, setGithubRepositories] = useState({
    data: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const getRepositories = async () => {
      const { data: repos } = await fetchGithubRepositoriesRest(
        _user?.userName
      );
      setGithubRepositories({ loading: false, data: repos, error: null });
    };
    getRepositories();
  }, [_user?.userName]);

  const [_filters, setFilters] = useState({ name: "", onlyFavorites: false });
  const { loading, data } = _gihubRepositories;
  const repositories = useMemo(
    () =>
      data?.map((repository) => ({
        ...repository,
        isFavorite: favoriteRepositories?.includes(repository?.id),
      })),
    [data, favoriteRepositories]
  );

  const filteredRepositories = useMemo(
    () =>
      repositories?.filter(
        (repository) =>
          repository?.name?.includes(_filters.name) &&
          (_filters.onlyFavorites ? repository.isFavorite : true)
      ),
    [_filters, repositories]
  );

  const handleChangeFilter = (e) => {
    setFilters((filters) => ({ ...filters, name: e.target.value }));
  };

  const handleChangeFavoritesCheckbox = (e) => {
    setFilters((filters) => ({ ...filters, onlyFavorites: e.target.checked }));
  };

  const handleLogoutButtonClick = async () => {
    await logout();

    navigate("/");
  };

  const handleToggleFavoritesClick = async (repository) => {
    try {
      const toggleResponse = await toggleFavoriteRepository(
        _user?.userName,
        repository.id
      );
      setUser((user) => ({
        ...user,
        favoriteRepositories: toggleResponse.data.favoriteRepositories,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile_page__container">
      <div className="profile_page__bar">
        <Grid container gap={2}>
          <TextField onChange={handleChangeFilter} value={_filters.name} />
          <FormControlLabel
            label="Only Favorites"
            control={
              <Checkbox
                checked={_filters.onlyFavorites}
                onChange={handleChangeFavoritesCheckbox}
              />
            }
          />
        </Grid>

        <Button onClick={handleLogoutButtonClick}>Logout</Button>
      </div>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid className="profile_page__content--wrapper" container spacing={4}>
        {filteredRepositories?.map((repository) => (
          <Grid item xs={6} sm={3}>
            <RepositoryCard
              {...repository}
              onToggleFavoritesClick={() =>
                handleToggleFavoritesClick(repository)
              }
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
