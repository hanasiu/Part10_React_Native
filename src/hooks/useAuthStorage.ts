import { createContext } from 'react';
import { useContext } from 'react'; 

const AuthStorageContext = createContext({} as unknown);

export const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default AuthStorageContext;