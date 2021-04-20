/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDashboard = /* GraphQL */ `
  subscription OnCreateDashboard($owner: String!) {
    onCreateDashboard(owner: $owner) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateDashboard = /* GraphQL */ `
  subscription OnUpdateDashboard($owner: String!) {
    onUpdateDashboard(owner: $owner) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteDashboard = /* GraphQL */ `
  subscription OnDeleteDashboard($owner: String!) {
    onDeleteDashboard(owner: $owner) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreatePanel = /* GraphQL */ `
  subscription OnCreatePanel($owner: String!) {
    onCreatePanel(owner: $owner) {
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
export const onUpdatePanel = /* GraphQL */ `
  subscription OnUpdatePanel($owner: String!) {
    onUpdatePanel(owner: $owner) {
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
export const onDeletePanel = /* GraphQL */ `
  subscription OnDeletePanel($owner: String!) {
    onDeletePanel(owner: $owner) {
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
export const onCreateDataSource = /* GraphQL */ `
  subscription OnCreateDataSource($owner: String!) {
    onCreateDataSource(owner: $owner) {
      id
      payload
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateDataSource = /* GraphQL */ `
  subscription OnUpdateDataSource($owner: String!) {
    onUpdateDataSource(owner: $owner) {
      id
      payload
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteDataSource = /* GraphQL */ `
  subscription OnDeleteDataSource($owner: String!) {
    onDeleteDataSource(owner: $owner) {
      id
      payload
      createdAt
      updatedAt
      owner
    }
  }
`;
