import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { View, TextInput } from 'react-native';

const SearchRepository = ({ searchQuery, setSearchQuery }: {
  searchQuery: string, setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}) => {
  const searchInput = React.useRef<TextInput>(null);
  useEffect(() => {
    if (searchQuery!=='') {
      searchInput?.current?.focus();
    }
  }, [searchQuery]);
  
  
  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Searchbar
        ref={searchInput}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        autoCapitalize='none'
        style={{ backgroundColor: 'white', width: '94%', marginTop: 5, borderRadius: 10 }}
        //autoFocus
      />
    </View>
  );
}

export default SearchRepository;