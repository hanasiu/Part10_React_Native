import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, Platform } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { RepositoriesResult } from '../types';
import { useNavigate } from 'react-router-dom';
import { Repository, Direction, Order_By } from '../types';
import OrderSelector from './OrderSelector';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 20,
    backgroundColor: 'white'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ data, loading, error, selectedOrder, onSelectOrder }: RepositoriesResult & { selectedOrder: { orderDirection: Direction; orderBy: Order_By }; onSelectOrder: (selectedValue: { orderDirection: Direction; orderBy: Order_By }) => void }) => {
  const navigate = useNavigate();

  const repositoryNodes = data?.repositories
    ? data?.repositories.edges?.map(edge => edge.node)
    : [];

  const toOneRepository = (item: Repository) => {
    navigate(`/${item.id}`, { state: { item } });
  };

  if (loading) {
    return <Text color="black" fontSize={16} fontWeight="normal">loading...</Text>;
  }
  if (error) {
    return <Text color="black" fontSize={16} fontWeight="normal">{`Error! ${error.message}`}</Text>;
  }

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => toOneRepository(item)}>
          <RepositoryItem item={item} style={styles.container} />
        </Pressable>
      )}
      ListHeaderComponent={
        <OrderSelector selectedOrder={selectedOrder} onSelectOrder={onSelectOrder} />
      }
      ListHeaderComponentStyle={{overflow: 'visible', zIndex:3}}
      removeClippedSubviews={Platform.OS === 'android' ? false : true} // this code is for android..
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState<{ orderDirection: Direction; orderBy: Order_By }>({
    orderDirection: Direction.DESC,
    orderBy: Order_By.CREATED_AT
  });

  const handleOrderSelection = (selectedValue: { orderDirection: Direction; orderBy: Order_By }) => {
    setSelectedOrder(selectedValue);
    // Do whatever you need to do with the selected value
    console.log('Selected Order:', selectedValue);
  };

  const { data, loading, error } = useRepositories(selectedOrder);

  return (
    <>
      {/* <OrderSelector selectedOrder={selectedOrder} onSelectOrder={handleOrderSelection} /> */}
      <RepositoryListContainer data={data} loading={loading} error={error} selectedOrder={selectedOrder} onSelectOrder={handleOrderSelection} />
    </>
  );
};

export default RepositoryList;


