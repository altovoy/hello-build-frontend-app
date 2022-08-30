import "./ProfilePage.scss";
import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { Backdrop, Grid, CircularProgress } from "@mui/material";

import { GET_REPOSITORIES } from "../../api/github.api";
import { createAdaptedRepositoriesGraphql } from "./../../adapters/github.adapters";

import { RepositoryCard } from "../../components/collections/RepositoryCard";

export const ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES);
  const repositories = useMemo(
    () => createAdaptedRepositoriesGraphql(data),
    [data]
  );
  console.log({ data, repositories });
  return (
    <div className="profile_page__container">
      <div className="profile_page__bar"></div>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid className="profile_page__content--wrapper" container spacing={4}>
        {repositories?.map((repository) => (
          <Grid item xs={6} sm={3}>
            <RepositoryCard {...repository} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
