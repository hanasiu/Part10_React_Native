import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query {
    repositories {
      edges {
        node {
            fullName
            reviewCount
            ratingAverage
            forksCount
            stargazersCount
            description
            language
            ownerAvatarUrl
        }
      }
    }
  }
`;

export const CHECK_ME = gql`
query {
  me {
    id
    username
  }
}
`