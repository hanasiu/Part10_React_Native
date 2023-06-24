import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, Platform, VirtualizedList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { RepositoriesResult } from '../types';
import { useNavigate } from 'react-router-dom';
import { Repository, Direction, Order_By } from '../types';
import OrderSelector from './OrderSelector';
import SearchRepository from './SearchRepository';
import { useDebounce } from 'use-debounce';

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = 
({ data, loading, error, selectedOrder, onSelectOrder, searchQuery, setSearchQuery, onEndReach }:
  RepositoriesResult & {
    selectedOrder: { orderDirection: Direction; orderBy: Order_By };
    onSelectOrder: (selectedValue: { orderDirection: Direction; orderBy: Order_By }) => void,
    searchQuery: string, setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
    onEndReach: () => void
  }) => {
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
        <View>
          <SearchRepository searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <OrderSelector selectedOrder={selectedOrder} onSelectOrder={onSelectOrder} />
        </View>
      }
      ListHeaderComponentStyle={{ overflow: 'visible', zIndex: 3 }}
      removeClippedSubviews={Platform.OS === 'android' ? false : true} // this code is for android..
      onEndReached={onEndReach}
      onEndReachedThreshold={0.6}
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
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);
  console.log(searchKeyword);


  const { data, fetchMore, loading, error } = useRepositories({ first: 5, ...selectedOrder, searchKeyword: searchKeyword });
  console.log(data);

  const onEndReach = () => {
    console.log("haha")
     fetchMore();
  };

  return (
    <>
      <RepositoryListContainer
        data={data}
        loading={loading}
        error={error}
        selectedOrder={selectedOrder}
        onSelectOrder={handleOrderSelection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} 
        onEndReach={onEndReach}
        />
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 20,
    backgroundColor: 'white'
  },
});


export default RepositoryList;


