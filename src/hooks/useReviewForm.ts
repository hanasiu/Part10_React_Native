import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
//import AuthStorage from '../utils/authStorage';
import { ReviewFormTypeToServer } from '../types';
import AuthStorage from "../utils/authStorage";



const useReviewForm = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  // Call the createReview mutation


  const createReview = async ({ ownerName, repositoryName, rating, text }: ReviewFormTypeToServer) => {
    const review = {
      repositoryName: repositoryName,
      ownerName: ownerName,
      rating: rating,
      text: text
    }
    const payload = await mutate({ variables: { review } });
    // const { data } = payload;
    // if (data?.authenticate) {
    // await authStorage.setAccessToken(data.authenticate.accessToken);
    // apolloClient.resetStore();
    // }
    return payload;
  };

  //   // Retrieve the created review from the response
  //   const createdReview = payload.data.createReview;

  //   console.log('Review created:', createdReview);
  return [createReview, result] as const;
  // } catch (error) {
  //   // Handle any errors that occurred during the mutation
  //   console.error('Error creating review:', error);
  // }
};

// const useReviewForm = () => {
//   const [mutate, result] = useMutation(AUTHENTICATE_USER);
//     const authStorage = useAuthStorage() as AuthStorage;
//     const apolloClient = useApolloClient();


//     // if(result.error){
//     //   console.log(result.error);
//     // }

//     const signIn = async ({ username, password }: SignInForm) => {
//       credentials.username = username;
//       credentials.password = password;
//       const payload = await mutate({variables: {credentials}});
//       const { data } = payload;
//       if (data?.authenticate) {
//       await authStorage.setAccessToken(data.authenticate.accessToken);
//       apolloClient.resetStore();
//       }
//       return payload;
//     };  

//     return [signIn, result] as const;
//   };

export default useReviewForm;