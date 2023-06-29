import React from 'react';
import useRepository from '../hooks/useRepository';
import { useLocation } from 'react-router-dom';
import { View, StyleSheet, FlatList } from 'react-native';
import Text from './Text';
import { useRepositoryType } from '../types';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './RepoReviewItem';

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
    const location = useLocation();
    const clickedItem = location.state?.item;

    if (!clickedItem) {
        return <div>Repository not found</div>;
    }
    const { data, loading, error, fetchMore } : useRepositoryType = useRepository({first:5, repositoryId:clickedItem.id});//id fullName reviews 
    const onEndReach = () => {
        console.log('You have reached the end of the list');
        fetchMore();
      };

    if (loading) {
        return <Text>Repository loading</Text>;
    }
    if (error) {
        return <Text>{error.message}</Text>;
    }

    const reviewNodes = data.repository.reviews
        ? data?.repository.reviews.edges.map(edge => edge.node)
        : [];
    console.log(reviewNodes);

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
            onEndReached={onEndReach}
            onEndReachedThreshold={0.6}
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