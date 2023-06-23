import React from 'react';
import Text from './Text';
import { View, StyleSheet, FlatList } from 'react-native';
import { UserReview } from '../types';
import MyReviewItem from './MyReviewItem';
import useMyReview from '../hooks/useMyReview';
import useMe from '../hooks/useMe';

const ItemSeparator = () => <View style={styles.separator} />;

const MyReview = () => {
    const { data } = useMe();
    const userReview: UserReview = useMyReview(!!data.me);

    if (userReview.loading) {
        return <Text>Repository loading</Text>;
    }
    if (userReview.error) {
        return <Text>{userReview.error.message}</Text>;
    }

    const reviewNodes = userReview.data.me.reviews
        ? userReview?.data?.me?.reviews?.edges.map(edge => edge.node)
        : [];
    console.log(reviewNodes);

    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <MyReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
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

export default MyReview;