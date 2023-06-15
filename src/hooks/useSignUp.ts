import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

// import { useAuthStorage } from '../hooks/useAuthStorage';
// import { useApolloClient } from '@apollo/client';
import { SignInForm } from '../types';
// import AuthStorage from "../utils/authStorage";



const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
    // const authStorage = useAuthStorage() as AuthStorage;
    // const apolloClient = useApolloClient();
    
    
    // if(result.error){
    //   console.log(result.error);
    // }
  
    const signUp = async ({ username, password }: SignInForm) => {
    //   const credentials = {
    //     username: username,
    //     password: password
    //   }
      // credentials.username = username;
      // credentials.password = password;
      const payload = await mutate({variables: {username, password}});
    //   const { data } = payload;
    //   if (data?.username) {
    // //   await authStorage.setAccessToken(data.authenticate.accessToken);
    // //   apolloClient.resetStore();
    //   }
      return payload;
    };  
    
    return [signUp, result] as const;
  };

export default useSignUp;