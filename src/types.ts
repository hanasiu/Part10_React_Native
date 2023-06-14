import { ApolloError } from "@apollo/client/errors";


export type Repository = {
  id: string;
  fullName: string;
  reviewCount: number;
  ratingAverage: number;
  forksCount: number;
  stargazersCount: number;
  description: string;
  language: string;
  ownerAvatarUrl: string;
  url: string;
};

export type RepositoryReview = {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
};

export type RepositoriesResult = {
  data: {
    repositories: {
      edges: {
        node: Repository;
      }[];
    };
  };
  loading: boolean;
  error: ApolloError | undefined;
};

export type RepositoryWithReview = {
  data: {
    repository: {
      id: string;
      reviews: {
        edges: {
          node: RepositoryReview;
        }[];
      };
    };
  };
  loading: boolean;
  error: ApolloError | undefined;
};

export type SignInForm = {
  username: string;
  password: string;
}

export type ReviewFormType = {
  ownerName: string;
  repositoryName: string;
  stringRating: string;
  text: string;
}

export type ReviewFormTypeToServer = {
  ownerName: string;
  repositoryName: string;
  rating: number;
  text: string;
}

