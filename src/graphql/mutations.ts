import { gql } from '@apollo/client';

// export const AUTHENTICATE_USER = gql`
// mutation authenticateUser($username: String!,$password: String!) {
//   authenticate(username: $username, password: $password) {
//       accessToken
//     }
//   }
// `;

export const AUTHENTICATE_USER = gql`
mutation authenticateUser($credentials: AuthenticateInput!) {
  authenticate(credentials: $credentials) {
    accessToken
    expiresAt
  }
}
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      userId
      repositoryId
      text
      rating
    }
  }
`;

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $password: String!) {
  createUser(user: { username: $username, password: $password }) {
    username
    id
  }
}
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;