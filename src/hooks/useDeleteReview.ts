import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { CHECK_ME } from '../graphql/queries';


const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);


  const deleteReview = async (id: string) => {
    const payload = await mutate({ variables: { id },
      refetchQueries: [
        CHECK_ME, // DocumentNode object parsed with gql
        'CheckMe' // Query name
      ], });
    return payload;
  };

  return [deleteReview, result] as const;
};


export default useDeleteReview;