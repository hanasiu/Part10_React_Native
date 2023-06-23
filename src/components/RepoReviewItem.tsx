import React from 'react';
import { View, StyleSheet} from 'react-native';
import Text from './Text';
import { RepositoryReview } from '../types';
import theme from '../theme';
import { format } from 'date-fns';


const RepoReviewItem = ({ review }: { review: RepositoryReview }) => {
    return (
        <View style={styles.container}>
            <View style={styles.upperInfoContainer}>
                <View style={styles.rateContainer}>
                    <Text style={styles.rateText}>{review.rating}</Text></View>
                <View style={styles.downInfoContainer}>
                    <View style={{ marginBottom: 4 }}><Text style={styles.textUsername}>
                        {review.user.username}</Text></View>
                    <View style={{ marginBottom: 5 }}><Text>{format(new Date(review.createdAt), 'MM/dd/yyyy')}</Text></View>
                    <View><Text>{review.text}</Text></View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white'
    },
    upperInfoContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    downInfoContainer: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'space-around'
    },
    rateContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rateText: {
        color: theme.colors.primary,
        fontWeight: 'bold',
        fontSize: 20
    },
    textUsername: {
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default RepoReviewItem;