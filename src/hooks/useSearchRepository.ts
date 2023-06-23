import { useQuery } from '@apollo/client';
import { SEARCH_REPOSITORY } from '../graphql/queries';

const useSearchRepository = (searchKeyword: string) => {
  const { data, error, loading } = useQuery(SEARCH_REPOSITORY, {
    variables: { searchKeyword }, 
    fetchPolicy: 'cache-and-network',
  });

  return { data, loading, error };
};
export default useSearchRepository;

