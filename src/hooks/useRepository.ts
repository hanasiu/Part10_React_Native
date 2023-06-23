import { useQuery } from '@apollo/client';
import { GET_A_REPOSITORY } from '../graphql/queries';


const useRepository = (variables: {first:number, repositoryId: string}) => {
  const { data, fetchMore, error, loading } = useQuery(GET_A_REPOSITORY, {
    variables, 
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };


  return { data, fetchMore: handleFetchMore, loading, error };
};
export default useRepository;