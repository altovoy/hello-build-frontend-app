export const createAdaptedRepositoriesGraphql = (data) =>
  data?.repositoryOwner?.repositories?.nodes;
