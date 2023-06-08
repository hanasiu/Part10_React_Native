//import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, 
    {
      fetchPolicy: 'cache-and-network',
    }
    );
 
  return { data, loading, error };
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