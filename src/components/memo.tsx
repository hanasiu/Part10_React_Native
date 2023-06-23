
// class RepositoryListContainer extends React.Component {
//     renderHeader = () => {
//       // this.props contains the component's props
//       const {data,loading,error,selectedOrder,onSelectOrder,searchQuery,setSearchQuery}:
//       { RepositoriesResult & {
//              selectedOrder: { orderDirection: Direction; orderBy: Order_By };
//              onSelectOrder: (selectedValue: { orderDirection: Direction; orderBy: Order_By }) => void,
//             searchQuery: string, setSearchQuery: React.Dispatch<React.SetStateAction<string>>
//            }}= this.props;
  
//       const repositoryNodes = data?.repositories
//       ? data?.repositories.edges?.map(edge => edge.node)
//       : [];
  
//     const toOneRepository = (item: Repository) => {
//       navigate(`/${item.id}`, { state: { item } });
//     };
  
//     if (loading) {
//       return <Text color="black" fontSize={16} fontWeight="normal">loading...</Text>;
//     }
//     if (error) {
//       return <Text color="black" fontSize={16} fontWeight="normal">{`Error! ${error.message}`}</Text>;
//     }
  
//       return (
//         <View>
//         <SearchRepository searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//         <OrderSelector selectedOrder={selectedOrder} onSelectOrder={onSelectOrder} />
//       </View>
//       );
//     };
  
//     render() {
//       return (
//         <FlatList
//         data={repositoryNodes}
//         ItemSeparatorComponent={ItemSeparator}
//         renderItem={({ item }) => (
//           <Pressable onPress={() => toOneRepository(item)}>
//             <RepositoryItem item={item} style={styles.container} />
//           </Pressable>
//         )}
//         ListHeaderComponent={this.renderHeader}
//         ListHeaderComponentStyle={{ overflow: 'visible', zIndex: 3 }}
//         removeClippedSubviews={Platform.OS === 'android' ? false : true} // this code is for android..
//       />
//       );
//     }
//   }