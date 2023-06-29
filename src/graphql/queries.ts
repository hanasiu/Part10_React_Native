import { gql } from '@apollo/client';

// export const GET_REPOSITORIES = gql`
// query {
//     repositories {
//       edges {
//         node {
//             id
//             fullName
//             reviewCount
//             ratingAverage
//             forksCount
//             stargazersCount
//             description
//             language
//             ownerAvatarUrl
//             url
//         }
//       }
//     }
//   }
// `;

export const GET_REPOSITORIES = gql`
query GetRepositories($first: Int, $after: String, $orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy,$searchKeyword: String) {
  repositories(first: $first, after: $after, orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword:$searchKeyword) {
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
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
}
`

export const GET_A_REPOSITORY = gql`
query GetRepository($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    id
    fullName
    reviews(first: $first, after: $after) {
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
`

export const SEARCH_REPOSITORY = gql`
query SearchRepository($searchKeyword: String){
  repositories(searchKeyword: $searchKeyword) {
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
`

export const CHECK_ME = gql`
query CheckMe($includeReviews: Boolean = false, $first: Int, $after: String) {
  me {
    id
    username
    reviews(first: $first, after: $after) @include(if: $includeReviews) {
      edges {
        node {
        id
        text
        rating
        createdAt
        repository {
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
`


