import {
  InMemoryCache,
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  gql
} from "@apollo/client";


let TOKEN = null;

const authMiddleware = new ApolloLink((req, next) => {
  if (!req.options.headers) {
    req.options.headers = {}; // Create the header object if needed.
  }
  req.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${TOKEN}`,
    },
  }));

  return next(req);
});

export const githubClient = new ApolloClient({
  link: concat(
    new HttpLink({
      uri: "https://api.github.com/graphql",
    }),
    authMiddleware
  ),
  connectToDevTools: true,
  cache: new InMemoryCache(),
});

export const GET_REPOSITORIES = gql`
  {
    search(type: REPOSITORY, query: "language:Javascript", first: 10) {
      nodes {
        ... on Repository {
          id
          nameWithOwner
          url
          descriptionHTML
        }
      }
    }
  }
`;
