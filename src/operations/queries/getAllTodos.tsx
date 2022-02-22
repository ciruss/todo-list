import { gql } from '@apollo/client';

export const GET_ALL_TODOS = gql`
  query GetAllTodos($options: PageQueryOptions) {
    todos(options: $options) {
      data {
        id
        title
        completed
        user {
          id
          username
        }
      }
    }
  }
`
