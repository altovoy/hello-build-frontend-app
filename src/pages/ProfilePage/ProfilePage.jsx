import React from "react";
import { ApolloProvider, useQuery } from "@apollo/client";

import { GET_REPOSITORIES,} from "../../api/github.api";

export const ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES);
  return <></>;
};
