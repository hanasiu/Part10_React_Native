import { useQuery } from '@apollo/client';
import { CHECK_ME } from '../graphql/queries';

const useMyReview = (variables: { includeReviews: boolean, first: number }) => {
  const { data, fetchMore, error, loading } = useQuery(CHECK_ME, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me?.reviews.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables
      },
    });
  };

  return { data, fetchMore: handleFetchMore, loading, error };
};

export default useMyReview;