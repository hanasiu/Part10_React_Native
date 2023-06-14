import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query {
    repositories {
      edges {
        node {
            id
            fullName
            reviewCount
            ratingAverage
            forksCount
            stargazersCount
            description
            language
            ownerAvatarUrl
            url
        }
      }
    }
  }
`;


export const GET_A_REPOSITORY = gql`
query GetRepository($repositoryId: ID!) {
  repository(id: $repositoryId) {
    id
    fullName
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`

export const CHECK_ME = gql`
query {
  me {
    id
    username
  }
}
`