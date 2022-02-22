import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      data {
        id
        name
        username
      }
    }
  }
`
