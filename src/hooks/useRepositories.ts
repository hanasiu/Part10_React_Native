//import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { Direction, Order_By } from '../types';
//{first, orderDirection, orderBy, searchKeyword}
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

 //const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(false);

  // const fetchRepositories = async () => {
  //   setLoading(true);

  //   // Replace the IP address part with your own IP address!
  //   const response = await fetch('http://172.31.99.198:5001/api/repositories');
  //   const json = await response.json();

  //   setLoading(false);
  //   setRepositories(json);
  // };
  // useEffect(() => {
  //   if (data) {
  //     setRepositories(data);
      
  //   }
  // }, [data]);


  // useEffect(() => {
  //   fetchRepositories();
  // }, []);

  //return { repositories, loading, refetch: fetchRepositories };