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


// export type RepositoryWithReview = {
//   data: {
//     repository: {
//       id: string;
//       reviews: {
//         edges: {
//           node: RepositoryReview;
//         }[];
//       };
//     };
//   };
//   loading: boolean;
//   error: ApolloError | undefined;
// };

export type useRepositoryType = {
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
  fetchMore: ()=>void;
}

export type MyReview = {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
  repository: Repository;
};

export type UserReview = {
  data: {
    me: {
      id: string;
      reviews: {
        edges: {
          node: MyReview;
        }[];
      };
    };
  };
  loading: boolean;
  error: ApolloError | undefined;
};

//SignIn and SignUp
export type SignInForm = {
  username: string;
  password: string;
}

export type SignUpForm = {
  username: string;
  password: string;
  confirmPassword: string;
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

export enum Direction {
  ASC="ASC",
  DESC="DESC"
}

export enum Order_By {
  CREATED_AT="CREATED_AT",
  RATING_AVERAGE="RATING_AVERAGE"
}