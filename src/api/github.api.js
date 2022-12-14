import axios from "axios";

import { InMemoryCache, ApolloClient, HttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let { REACT_APP_GIT_TOKEN, REACT_APP_GIT_API } = process.env;

const httpLink = new HttpLink({
  uri: REACT_APP_GIT_API + "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token || REACT_APP_GIT_TOKEN}`,
    },
  };
});

export const githubClient = new ApolloClient({
  link: authLink.concat(httpLink),
  connectToDevTools: true,
  cache: new InMemoryCache(),
});

export const GET_REPOSITORIES = gql`
  {
    repositoryOwner(login: "altovoy") {
      repositories(
        first: 100
        ownerAffiliations: OWNER
        privacy: PUBLIC
        orderBy: { field: NAME, direction: ASC }
      ) {
        totalCount

        pageInfo {
          hasNextPage
          endCursor
        }

        nodes {
          name
          description
          id
        }
      }
    }
  }
`;

export const fetchGithubRepositoriesRest = (userName) =>
  axios.get(`${REACT_APP_GIT_API}/users/${userName}/repos`);
