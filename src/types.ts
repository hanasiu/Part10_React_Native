import { ApolloError } from "@apollo/client/errors";

export type Repository = {
    fullName: string;
    reviewCount: number;
    ratingAverage: number;
    forksCount: number;
    stargazersCount: number;
    description: string;
    language: string;
    ownerAvatarUrl: string;
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
  
export type SignInForm = {
  username: string;
  password: string;
}
