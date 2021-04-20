/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDashboard = /* GraphQL */ `
  query GetDashboard($id: ID!) {
    getDashboard(id: $id) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listDashboards = /* GraphQL */ `
  query ListDashboards(
    $filter: ModelDashboardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDashboards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getPanel = /* GraphQL */ `
  query GetPanel($id: ID!) {
    getPanel(id: $id) {
      id
      category
      title
      status
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPanels = /* GraphQL */ `
  query ListPanels(
    $filter: ModelPanelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPanels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category
        title
        status
        description
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getDataSource = /* GraphQL */ `
  query GetDataSource($id: ID!) {
    getDataSource(id: $id) {
      id
      payload
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listDataSources = /* GraphQL */ `
  query ListDataSources(
    $filter: ModelDataSourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDataSources(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        payload
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
