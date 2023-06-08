import { useQuery } from '@apollo/client';
import { CHECK_ME } from '../graphql/queries';

const useMe = () => {
    
  const { data, error, loading } = useQuery(CHECK_ME);
 
  return { data, loading, error };
};

export default useMe;