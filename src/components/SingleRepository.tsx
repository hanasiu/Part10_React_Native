import React from 'react';
import useRepository from '../hooks/useRepository';
import { useLocation } from 'react-router-dom';
import { View, StyleSheet, FlatList } from 'react-native';
import Text from './Text';
import { RepositoryWithReview } from '../types';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
    const location = useLocation();
    const clickedItem = location.state?.item;

    if (!clickedItem) {
        return <div>Repository not found</div>;
    }
    const oneRepository: RepositoryWithReview = useRepository(clickedItem.id);//id fullName reviews 

    if (oneRepository.loading) {
        return <Text>Repository loading</Text>;
    }
    if (oneRepository.error) {
        return <Text>{oneRepository.error.message}</Text>;
    }

    const reviewNodes = oneRepository.data.repository.reviews
        ? oneRepository?.data?.repository.reviews.edges.map(edge => edge.node)
        : [];

    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={() => (
                <View>
                    <RepositoryInfo repository={clickedItem} />
                    <View style={styles.space} />
                </View>
            )}
        // ...
        />
    );
};

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    space: {
        height: 10,
    }
});


export default SingleRepository;