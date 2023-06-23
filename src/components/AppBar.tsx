import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import useMe from "../hooks/useMe";
import useRemoveUser from "../hooks/useRemoveUser";
import React from 'react';
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scroll: {
    flexDirection: "row"
  },
  buttonFirst: {
    marginLeft: 20
  },
  button: {
    marginLeft: 10
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  }
  // ...
});


const AppBar = () => {
  const { data } = useMe();
  //const authStorage = useAuthStorage();
  //const apolloClient = useApolloClient();

  const removeUser = useRemoveUser(); // Call the hook directly
  const navigate = useNavigate();

  const signOut = async () => {
    await removeUser(); // Await the removal process
    navigate('/');
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}
      >
        <View style={styles.buttonFirst}>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </View>
        {!data?.me && <View style={styles.button}>
          <Link to="/signin">
            <Text style={styles.text}>Sign-In</Text>
          </Link>
        </View>}
        {data?.me && <View style={styles.button}>
          <Link to="/review">
            <Text style={styles.text}>Create a review</Text>
          </Link>
        </View>}
        {data?.me && <View style={styles.button}>
          <Link to="/myreview">
            <Text style={styles.text}>My reviews</Text>
          </Link>
        </View>}
        {data?.me && <View style={styles.button}>
          <Pressable onPress={signOut}>
            <Text style={styles.text}>Sign-out</Text>
          </Pressable>
        </View>}
        {!data?.me && <View style={styles.button}>
          <Link to="/signup">
            <Text style={styles.text}>Sign-Up</Text>
          </Link>
        </View>}
      </ScrollView>
    </View>
  )
};

export default AppBar;