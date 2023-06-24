import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { Direction, Order_By } from '../types';

const useRepositories = (variables: 
  { first:number, orderDirection: Direction, orderBy: Order_By, searchKeyword: string}) => {
  const { data, fetchMore, error, loading } = useQuery(GET_REPOSITORIES, 
    {
      variables,
      fetchPolicy: 'cache-and-network',
    }
    );
    const handleFetchMore = () => {
      const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
  
      if (!canFetchMore) {
        return;
      }
  
      fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          ...variables
        },
      });
    };
 
  return { data, fetchMore: handleFetchMore, loading, error };
};

export default useRepositories;