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