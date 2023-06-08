import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  namespace: string;

  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    try {
        const value = await AsyncStorage.getItem('auth')
        if(value !== null) {
          return value;
        } else {
          return null;
        }
      } catch(e) {
        console.log(e);
      }
  }

  async setAccessToken(accessToken: string) {
    try {
        await AsyncStorage.setItem('auth', accessToken)
      } catch (e) {
        console.log(e);
      }
  }

  async removeAccessToken() {
    try {
        await AsyncStorage.removeItem('auth')
      } catch(e) {
         console.log(e);
      }
  }
}

export default AuthStorage;