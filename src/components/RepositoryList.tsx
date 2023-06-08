import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { RepositoriesResult } from '../types';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  text: {

  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ data, loading, error }: RepositoriesResult) => {
  // if (loading) {
  //   return <Text color="black" fontSize={16} fontWeight="normal" style={styles.text}>loading...</Text>
  // }
  // if (error) 
  // return <Text color="black" fontSize={16} fontWeight="normal" style={styles.text}>
  //   `Error! ${error.message}`</Text>;

  const repositoryNodes = data?.repositories
    ? data?.repositories.edges?.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

const RepositoryList = () => {
  const { data, loading, error } = useRepositories();

  return <RepositoryListContainer data={data} loading={loading} error={error} />;
};



// const RepositoryList = () => {
//   const { data, loading, error } = useRepositories();
//   if(loading) {
//     return <Text>loading...</Text>
//   }
//   if (error) return `Error! ${error.message}`;

//   const repositoryNodes = data.repositories
//     ? data.repositories.edges?.map(edge => edge.node)
//     : [];

//   return (
//     <FlatList
//       data={repositoryNodes}
//       ItemSeparatorComponent={ItemSeparator}
//       renderItem={({item}) => <RepositoryItem item={item}/>}
//     />
//   );
// };

export default RepositoryList;