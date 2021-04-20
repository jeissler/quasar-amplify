/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDashboard = /* GraphQL */ `
  mutation CreateDashboard(
    $input: CreateDashboardInput!
    $condition: ModelDashboardConditionInput
  ) {
    createDashboard(input: $input, condition: $condition) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateDashboard = /* GraphQL */ `
  mutation UpdateDashboard(
    $input: UpdateDashboardInput!
    $condition: ModelDashboardConditionInput
  ) {
    updateDashboard(input: $input, condition: $condition) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteDashboard = /* GraphQL */ `
  mutation DeleteDashboard(
    $input: DeleteDashboardInput!
    $condition: ModelDashboardConditionInput
  ) {
    deleteDashboard(input: $input, condition: $condition) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createPanel = /* GraphQL */ `
  mutation CreatePanel(
    $input: CreatePanelInput!
    $condition: ModelPanelConditionInput
  ) {
    createPanel(input: $input, condition: $condition) {
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
export const updatePanel = /* GraphQL */ `
  mutation UpdatePanel(
    $input: UpdatePanelInput!
    $condition: ModelPanelConditionInput
  ) {
    updatePanel(input: $input, condition: $condition) {
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
export const deletePanel = /* GraphQL */ `
  mutation DeletePanel(
    $input: DeletePanelInput!
    $condition: ModelPanelConditionInput
  ) {
    deletePanel(input: $input, condition: $condition) {
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
export const createDataSource = /* GraphQL */ `
  mutation CreateDataSource(
    $input: CreateDataSourceInput!
    $condition: ModelDataSourceConditionInput
  ) {
    createDataSource(input: $input, condition: $condition) {
      id
      payload
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateDataSource = /* GraphQL */ `
  mutation UpdateDataSource(
    $input: UpdateDataSourceInput!
    $condition: ModelDataSourceConditionInput
  ) {
    updateDataSource(input: $input, condition: $condition) {
      id
      payload
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteDataSource = /* GraphQL */ `
  mutation DeleteDataSource(
    $input: DeleteDataSourceInput!
    $condition: ModelDataSourceConditionInput
  ) {
    deleteDataSource(input: $input, condition: $condition) {
      id
      payload
      createdAt
      updatedAt
      owner
    }
  }
`;
