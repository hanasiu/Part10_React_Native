import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

import { ReviewFormTypeToServer } from '../types';


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

  return [createReview, result] as const;
};


export default useReviewForm;