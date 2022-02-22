import { gql } from '@apollo/client';

export const GET_USER_TODOS = gql`
  query GetUserTodos($id: ID!) {
    user(id: $id) {
      id
      name
      username
      todos {
        data {
          id
          title
          completed
        }
      }
    }
  }
`
