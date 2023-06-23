import React from 'react';
import { useState } from 'react';
import { Direction, Order_By } from "../types";
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
//import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';
import { View } from 'react-native';

const OrderSelector = ({ selectedOrder, onSelectOrder }: {
  selectedOrder: {
    orderDirection: Direction;
    orderBy: Order_By;
  } | undefined,
  onSelectOrder: (selectedValue: {
    orderDirection: Direction;
    orderBy: Order_By;
}) => void
}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  //const [selectedValue, setSelectedValue] = useState(selectedOrder);
  let selectedTitle =
  (selectedOrder?.orderDirection ===Direction.DESC && selectedOrder?.orderBy === Order_By.CREATED_AT ? "Latest repositories" :
  selectedOrder?.orderDirection ===Direction.ASC && selectedOrder?.orderBy === Order_By.CREATED_AT ? "Oldest repositories" :
  selectedOrder?.orderDirection ===Direction.DESC && selectedOrder?.orderBy === Order_By.RATING_AVERAGE ? "Highest rated repositories" :
  "Lowest rated repositories");

  return (
    <PaperProvider>
      <View
        style={{
          //paddingTop: 50,
           flexDirection: 'row',
           justifyContent: 'flex-end',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>{`👇 ${selectedTitle}`}</Button>}
          style={{marginTop:-41, marginLeft:6}}
          >
          <Menu.Item onPress={() => {
             onSelectOrder({ orderDirection: Direction.DESC, orderBy: Order_By.CREATED_AT })
             closeMenu();
             }} title="Latest repositories"/>
          <Divider />
          <Menu.Item onPress={() => {
          onSelectOrder({ orderDirection: Direction.ASC, orderBy: Order_By.CREATED_AT });
          closeMenu();
          }} title="Oldest repositories"/>
          <Divider />
          <Menu.Item onPress={() => {
            onSelectOrder({ orderDirection: Direction.DESC, orderBy: Order_By.RATING_AVERAGE });
            closeMenu();
          }} title="Highest rated repositories"/>
          <Divider />
          <Menu.Item onPress={() => {
            onSelectOrder({ orderDirection: Direction.ASC, orderBy: Order_By.RATING_AVERAGE });
            closeMenu();
          }} title="Lowest rated repositories"/>
        </Menu>
      </View>
    </PaperProvider>
  );
}


export default OrderSelector;

