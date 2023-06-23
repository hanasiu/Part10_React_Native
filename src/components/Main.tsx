import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
//import Text from './Text';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
import MyReview from './MyReview';
//import FlexboxExample from './FlexBoxExample';



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});


const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />}/>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/:id" element={<SingleRepository/>}/>
        <Route path="/review" element={<ReviewForm/>}/>
        <Route path="/myreview" element={<MyReview/>}/>
      </Routes>
    </View>
  );
};

export default Main;