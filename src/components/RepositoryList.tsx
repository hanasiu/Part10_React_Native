import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { RepositoriesResult } from '../types';
import { useNavigate } from "react-router-dom";
import {Repository} from '../types';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ data, loading, error }: RepositoriesResult) => {
  if (loading) {
    return <Text color="black" fontSize={16} fontWeight="normal">loading...</Text>
  }
  if (error) 
  return <Text color="black" fontSize={16} fontWeight="normal">
    `Error! ${error.message}`</Text>;
  const navigate = useNavigate();

  const repositoryNodes = data?.repositories
    ? data?.repositories.edges?.map(edge => edge.node)
    : [];

    const toOneRepository = (item: Repository) => {
      navigate(`/${item.id}`, { state: { item } });
    };
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <Pressable onPress={() => toOneRepository(item)}><RepositoryItem item={item} style={styles.container} /></Pressable>}
    />
  );
};

const RepositoryList = () => {
  const { data, loading, error } = useRepositories();

  return <RepositoryListContainer data={data} loading={loading} error={error} />;
};

export default RepositoryList;