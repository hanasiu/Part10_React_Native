import { useQuery } from '@apollo/client';
import { GET_A_REPOSITORY } from '../graphql/queries';

const useRepository = (repositoryId: string) => {
  const { data, error, loading } = useQuery(GET_A_REPOSITORY, {
    variables: { repositoryId }, 
    fetchPolicy: 'cache-and-network',
  });

  return { data, loading, error };
};
export default useRepository;