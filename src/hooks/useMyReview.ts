import { useQuery } from '@apollo/client';
import { CHECK_ME } from '../graphql/queries';

const useMyReview = (includeReviews: boolean) => {
  const { data, error, loading } = useQuery(CHECK_ME, {
    variables: { includeReviews }, 
    fetchPolicy: 'cache-and-network',
  });

  return { data, loading, error };
};
export default useMyReview;