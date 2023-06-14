import { useMutation } from '@apollo/client';
import { AUTHENTICATE_USER } from '../graphql/mutations';

import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
//import AuthStorage from '../utils/authStorage';
import { SignInForm } from '../types';
import AuthStorage from "../utils/authStorage";



const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE_USER);
    const authStorage = useAuthStorage() as AuthStorage;
    const apolloClient = useApolloClient();
    
    
    // if(result.error){
    //   console.log(result.error);
    // }
  
    const signIn = async ({ username, password }: SignInForm) => {
      const credentials = {
        username: username,
        password: password
      }
      // credentials.username = username;
      // credentials.password = password;
      const payload = await mutate({variables: {credentials}});
      const { data } = payload;
      if (data?.authenticate) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
      }
      return payload;
    };  
    
    return [signIn, result] as const;
  };

export default useSignIn;