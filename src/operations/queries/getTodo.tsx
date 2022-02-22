import { gql } from "@apollo/client";

export const GET_TODO = gql`
  query GetTodo($id: ID!) {
    todo(id: $id) {
      id
      title
      completed
      user {
        id
        name
        username
      }
    }
  }
`