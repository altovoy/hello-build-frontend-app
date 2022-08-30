import "./ProfilePage.scss";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";

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

import { GET_REPOSITORIES } from "../../api/github.api";
import { createAdaptedRepositoriesGraphql } from "./../../adapters/github.adapters";

import { RepositoryCard } from "../../components/collections/RepositoryCard";
import { logout } from "../../api/auth.api";
import {
  getFavoriteRepos,
  removeFavoriteRepository,
  saveFavoriteRepository,
  toggleFavoriteRepository,
} from "./../../api/favorites.api";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [_favoriteRepos, setFavoriteRepos] = useState([]);

  const [_filters, setFilters] = useState({ name: "", onlyFavorites: false });
  const { loading, error, data } = useQuery(GET_REPOSITORIES);
  const repositories = useMemo(
    () =>
      createAdaptedRepositoriesGraphql(data)?.map((repository) => ({
        ...repository,
        isFavorite: _favoriteRepos?.includes(repository?.id),
      })),
    [data, _favoriteRepos]
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
  console.log({ data, repositories });

  const handleChangeFilter = (e) => {
    setFilters((filters) => ({ ...filters, name: e.target.value }));
  };

  const handleChangeFavoritesCheckbox = (e) => {
    setFilters((filters) => ({ ...filters, onlyFavorites: e.target.checked }));
  };

  const handleLogoutButtonClick = async () => {
    try {
      await logout();
      navigate("/");
    } catch {}
  };

  const handleToggleFavoritesClick = async (repository) => {
    try {
      const toggleResponse = await toggleFavoriteRepository(
        "altovoy",
        repository.id
      );
      setFavoriteRepos(toggleResponse.data.favoriteRepositories);
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
